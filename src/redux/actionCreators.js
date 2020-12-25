import * as actionTypes from './actionTypes';
import { Client } from 'irc-framework';
import assert from 'assert'
import { middleware as defaultMiddleware } from '../utils/middlewares';

export const connect = ({
  host,
  username,
  port = 6667,
  connectionTimeout = 25000,
  useMiddleware = true,
  suppressMiddlewareErrors = true,
}) => dispatch => new Promise((resolve, reject) => {
  try {
    const timeoutConfig = setTimeout(() => {
      reject()
    }, connectionTimeout);

    const connection = new Client();

    connection.connect({
      host,
      port,
      nick: username,
      username,
      gecos: username,
      version: username
    });

    if (useMiddleware) {
      const middlewareHandlers = {
        "join": _middlewareJoin,
        "part": _middlewarePart,
        "motd": _middlewareSetMotd,
        "topic": _middlewareSetTopic,
        "userlist": _middlewareUserList,
        "mode": _middlewareMode,
        "kick": _middlewareKick,
        "irc error": _middlewareIrcError,
      }

      const middlewareWithDispatch = defaultMiddleware(dispatch, middlewareHandlers, {
        suppressMiddlewareErrors,
      })
      connection.use(middlewareWithDispatch())
    }

    connection.on('registered', function ({
      tags
    }) {
      clearTimeout(timeoutConfig);
      resolve({
        type: actionTypes.REGISTERED,
        payload: {
          server: {
            host,
            username,
            port,
            tags,
          },
          connection: connection
        },
      });
    });
  } catch (error) {
    console.log(error);
    reject()
  }
})
export const disconnect = ({
  host,
  removeAfterDisconnect = false
}) => {
  try {
    assert(typeof removeAfterDisconnect === 'boolean', "removeAfterDisconnect should be a boolean")
    assert(typeof host === 'string', "host should be a string");


    return {
      type: actionTypes.DISCONNECT,
      payload: {
        host,
        removeAfterDisconnect,
      },
    }

  } catch (error) {
    console.log(error);
  }
}

export const removeError = ({
  host,
}) => {
  try {
    assert(typeof host === 'string', "host should be a string")

    return {
      type: actionTypes.REMOVE_ERROR,
      payload: {
        host,
      },
    }

  } catch (error) {
    console.log(error);
    return false
  }
}
export const join = ({
  channel,
  host,
}) => {
  try {
    assert(typeof channel === 'string', "channel should be a string")
    assert(typeof host === 'string', "host should be a string")

    return {
      type: actionTypes.JOIN,
      payload: {
        channel,
        host,
      },
    }

  } catch (error) {
    console.log(error);
    return false
  }
}
export const leave = ({
  channel,
  host,
}) => {
  try {
    assert(typeof channel === 'string', "channel should be a string")
    assert(typeof host === 'string', "host should be a string")

    return {
      type: actionTypes.PART,
      payload: {
        channel,
        host,
      },
    }

  } catch (error) {
    console.log(error);
    return false
  }
}


export const _middlewareSetMotd = ({
  event = {},
  client = {
    options: {}
  }
}) => {


  const {
    host
  } = client.options

  const {
    motd,
    tags
  } = event;

  return ({
    type: actionTypes.MIDDLEWARE_MOTD,
    payload: {
      motd,
      tags,
      host
    }
  })
}

export const _middlewareSetTopic = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  const {
    topic,
    channel,
    nick,
    time,
    tags
  } = event;

  const {
    host
  } = client.options

  return ({
    type: actionTypes.MIDDLEWARE_TOPIC,
    payload: {
      topic,
      channel,
      nick,
      time,
      tags,
      host
    }
  })
}

export const _middlewareUserList = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  const {
    channel,
    users,
  } = event;

  const {
    host
  } = client.options

  return ({
    type: actionTypes.MIDDLEWARE_USER_LIST,
    payload: {
      channel,
      users,
      host,
    }
  })
}
export const _middlewareMode = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  const {
    modes,
    nick,
    target,
  } = event;

  const {
    host
  } = client.options

  return ({
    type: actionTypes.MIDDLEWARE_MODE,
    payload: {
      modes,
      nick,
      target,
      host,
    }
  })
}
export const _middlewarePart = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  const {
    channel,
    nick,
  } = event;

  const {
    host
  } = client.options

  return ({
    type: actionTypes.MIDDLEWARE_PART,
    payload: {
      channel,
      nick,
      host
    }
  })
}

export const _middlewareJoin = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  const {
    account,
    channel,
    gecos,
    hostname,
    ident,
    nick,
    tags,
    time,
  } = event;

  const {
    host
  } = client.options

  return ({
    type: actionTypes.MIDDLEWARE_JOIN,
    payload: {
      account,
      channel,
      gecos,
      hostname,
      ident,
      nick,
      tags,
      time,
      host
    }
  })
}

export const _middlewareKick = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  try {
    const {
      channel,
      nick,
      kicked,
    } = event;
  
    const {
      host
    } = client.options
  
    return ({
      type: actionTypes.MIDDLEWARE_KICK,
      payload: {
        channel,
        nick,
        kicked,
        host
      }
    })
  } catch (error) {
    console.log(error);
    return false
  }
}

export const _middlewareIrcError = ({
  event = {},
  client = {
    options: {}
  }
}) => {
  const {
    channel,
    error,
    reason,
  } = event;

  const {
    host
  } = client.options

  return ({
    type: actionTypes.MIDDLEWARE_IRC_ERROR,
    payload: {
      channel,
      error,
      reason,
      host
    }
  })
}