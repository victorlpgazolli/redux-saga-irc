import { DISCONNECT, JOIN, MOTD, REGISTERED, TOPIC } from "./actionTypes";

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
    [MOTD]: () => {
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
    [TOPIC]: () => {
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

  if (actionTypes[action.type]) return actionTypes[action.type]();
  return state;
}
