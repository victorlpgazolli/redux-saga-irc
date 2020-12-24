import * as actionTypes from './actionTypes';
import { Client } from 'irc-framework';
import assert from 'assert'
export const connect = ({
  host,
  username,
  port = 6667,
}) => new Promise((resolve, reject) => {
  try {
    const connection = new Client();

    connection.connect({
      host,
      port,
      nick: username,
      username,
      gecos: username,
      version: username
    });

    connection.on('registered', function ({
      tags
    }) {
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