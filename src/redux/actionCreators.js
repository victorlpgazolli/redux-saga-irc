import * as actionTypes from './actionTypes';
import { Client } from 'irc-framework';

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

export const join = ({
  channel,
  connection = new Client,
}) => new Promise((resolve, reject) => {
  try {
    console.log({ connection });
    const channelConn = connection.channel(channel)
    channelConn.join();

    const users = channelConn.users;
    console.log({ channelConn });
    return {
      type: actionTypes.JOIN,
      payload: {
        channel: channel,
        users: users,
      },
    }

  } catch (error) {
    console.log(error);
  }
})
