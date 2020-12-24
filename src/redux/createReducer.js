import { DISCONNECT, JOIN, REGISTERED } from "./actionTypes";

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

      return {
        ...state,
        servers: {
          ...state.servers,
          [host]: {
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
    }
  };

  if (actionTypes[action.type]) return actionTypes[action.type]();
  return state;
}
