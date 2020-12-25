import {
  DISCONNECT,
  JOIN,
  REGISTERED,
  PART,
  MIDDLEWARE_MOTD,
  MIDDLEWARE_TOPIC,
  MIDDLEWARE_PART,
  MIDDLEWARE_JOIN,
  MIDDLEWARE_USER_LIST,
  MIDDLEWARE_MODE,
  MIDDLEWARE_KICK,
  MIDDLEWARE_IRC_ERROR,
} from "./actionTypes";

const operationStates = {
  loadLoading: false,
  loadSuccess: false,
  loadFail: false,
}

const INITIAL_STATE = {
  servers: {},
  users: {},
  channels: {},
  connections: {},
  errors: {},
  ...operationStates
};

export default function irc(state = INITIAL_STATE, action = {}) {
  const actionTypes = {
    [REGISTERED]: () => {
      const {
        host,
        username,
        port,
        tags,
      } = action.payload.server || {};

      const hostInfo = state.servers[host] || {}

      return {
        ...state,
        servers: {
          ...state.servers,
          [host]: {
            ...hostInfo,
            host,
            username,
            port,
            tags,
          },
        },
        connections: {
          ...state.connections,
          [host]: action.payload.connection
        }
      }
    },
    [JOIN]: () => {
      const {
        channel: channelName,
        host,
      } = action.payload;

      const hasHost = state.connections && state.connections.hasOwnProperty(host);

      if (!hasHost) return state;

      const channel = state.connections[host].channel(channelName);

      channel.join();

      const users = channel.users;

      const channels = state.channels[host] || [];

      return {
        ...state,
        channels: {
          ...state.channels,
          [host]: [...channels, channel],
        },
        users: {
          ...state.users,
          [host]: users
        }
      }
    },
    [PART]: () => {
      const {
        channel: channelName,
        host,
      } = action.payload;

      const hasHost = state.channels && state.channels.hasOwnProperty(host) && Array.isArray(state.channels[host])

      if (!hasHost) return state;

      const channels = state.channels[host];

      const channelIndex = channels.findIndex(({ name }) => name === channelName);

      const [channel] = channels.splice(channelIndex, 1)

      channel.part();

      return {
        ...state,
        channels: {
          ...state.channels,
          [host]: channels,
        },
      }
    },
    [MIDDLEWARE_MODE]: () => {
      const {
        modes = [],
        nick,
        target,
        host,
      } = action.payload;

      const hasUsersHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])
      const hasChannelsHost = state.channels && state.channels.hasOwnProperty(host) && Array.isArray(state.channels[host])

      if (!hasUsersHost || !hasChannelsHost) return state;

      const formattedMode = modes.map(mode => mode.mode);

      const userModifiedIndex = state.users.findIndex(user => user.nick === nick && user.channel === target);

      const user = state.users.splice(userModifiedIndex, 1);

      user.modes = modes;

      state.users.splice(userModifiedIndex, 0, {
        ...user,
        modes: formattedMode
      });

      const channelIndex = state.channels[host].findIndex(ch => ch.name === target);

      const channel = state.channels[host].splice(channelIndex, 1);

      channel.users = channel.users.map(user => {
        if (user.nick === nick) {
          return {
            ...user,
            modes: formattedMode
          };
        }
        return user
      })

      state.channels[host].splice(channelIndex, 0, channel);

      return {
        ...state,
        users: {
          ...state.users,
        },
        channels: {
          ...state.channels
        }
      }
    },
    [MIDDLEWARE_USER_LIST]: () => {
      const {
        channel = "",
        users = [],
        host,
      } = action.payload;

      const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

      if (!hasHost) return state;

      const userWithChannel = users.map(user => ({
        ...user,
        channel
      }));

      return {
        ...state,
        users: {
          ...state.users,
          [host]: userWithChannel,
        },
      }
    },
    [MIDDLEWARE_USER_LIST]: () => {
      const {
        channel = "",
        users = [],
        host,
      } = action.payload;

      const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

      if (!hasHost) return state;

      const userWithChannel = users.map(user => ({
        ...user,
        channel
      }));

      return {
        ...state,
        users: {
          ...state.users,
          [host]: userWithChannel,
        },
      }
    },
    [MIDDLEWARE_IRC_ERROR]: () => {
      const {
        channel,
        error,
        reason,
        host,
      } = action.payload;

      if (!state.errors) state.errors = {};

      const hasHost = state.errors && state.errors.hasOwnProperty(host) && Array.isArray(state.errors[host])
      
      if (!hasHost) state.errors[host] = {}

      const errorObj = {
        channel,
        error,
        reason,
        nonce: +state.errors[host].nonce + 1
      }

      return {
        ...state,
        errors: {
          ...state.errors,
          [host]: {
            ...state.errors[host],
            errorObj,
          }
        }
      }
    },
    [MIDDLEWARE_KICK]: () => {
      const {
        channel,
        nick,
        kicked,
        host,
      } = action.payload;

      const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

      if (!hasHost) return state;

      return {
        ...state,
        users: {
          ...state.users,
          [host]: state.users[host].filter(user => {
            const isSameChannel = user.channel === channel;
            const isSameNick = user.nick === kicked;
            return !(isSameNick && isSameChannel)
          }),
        },
      }
    },
    [MIDDLEWARE_PART]: () => {
      const {
        channel,
        nick,
        host,
      } = action.payload;

      const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

      if (!hasHost) return state;

      return {
        ...state,
        users: {
          ...state.users,
          [host]: state.users[host].filter(user => {
            const isSameChannel = user.channel === channel;
            const isSameNick = user.nick === nick;
            return !(isSameNick && isSameChannel)
          }),
        },
      }
    },
    [MIDDLEWARE_JOIN]: () => {
      const {
        account,
        channel,
        gecos,
        hostname,
        ident,
        nick,
        tags,
        time,
        host,
      } = action.payload;

      const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

      if (!hasHost) return state;

      const newUser = {
        account,
        channel,
        gecos,
        hostname,
        ident,
        nick,
        tags,
        time,
      }

      const removeUserIfAlreadyExists = user => {
        const isSameChannel = user.channel === channel;
        const isSameNick = user.nick === nick;
        return !(isSameNick && isSameChannel)
      }

      return {
        ...state,
        users: {
          ...state.users,
          [host]: [
            ...state.users[host].filter(removeUserIfAlreadyExists),
            newUser
          ],
        },
      }
    },
    [DISCONNECT]: () => {

      const {
        host,
        removeAfterDisconnect,
      } = action.payload;

      const hasHost = state.connections && state.connections.hasOwnProperty(host);

      if (!hasHost) return state;

      state.connections[host].quit();

      if (removeAfterDisconnect) {
        delete state.servers[host]
        delete state.channels[host]
        delete state.users[host]
        delete state.connections[host]
      }

      return state
    },
    [MIDDLEWARE_MOTD]: () => {
      const {
        motd,
        host
      } = action.payload;

      const hasHost = state.servers && state.servers.hasOwnProperty(host);

      if (!hasHost) state.servers[host] = {}

      const serverInfo = state.servers[host] || {}

      return {
        ...state,
        servers: {
          ...state.servers,
          [host]: {
            ...serverInfo,
            motd: motd
          },
        },
      }
    },
    [MIDDLEWARE_TOPIC]: () => {
      const {
        topic,
        channel,
        nick,
        time,
        tags,
        host
      } = action.payload;

      const hasHost = state.servers && state.servers.hasOwnProperty(host);

      if (!hasHost) state.servers[host] = {}

      const serverInfo = state.servers[host] || {};

      const allTopics = serverInfo.topic || {};

      const channelTopic = allTopics[channel] || {};

      return {
        ...state,
        servers: {
          ...state.servers,
          [host]: {
            ...serverInfo,
            topic: {
              ...allTopics,
              [channel]: {
                ...channelTopic,
                topic,
                nick,
                time,
                tags
              }
            }
          },
        },
      }
    }
  };

  if (action.type && actionTypes[action.type]) return actionTypes[action.type]();
  return state;
}
