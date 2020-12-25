import * as actionTypes from './actionTypes';
import { Client } from 'irc-framework';
import assert from 'assert'
import { middleware as defaultMiddleware } from '../utils/middlewares';

export const connect = ({
  host,
  username,
  port = 6667,
  connectionTimeout = 25000,
  middleware = defaultMiddleware,
  useMiddleware = true
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
      const middlewareWithDispatch = middleware(dispatch, {
        motd: _middlewareSetMotd,
        topic: _middlewareSetTopic,
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
    type: actionTypes.MOTD,
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
    type: actionTypes.TOPIC,
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