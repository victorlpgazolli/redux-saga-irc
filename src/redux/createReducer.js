import { REGISTERED } from "./actionTypes";

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
    }
  };

  if (actionTypes[action.type]) return actionTypes[action.type]();
  return state;
}
