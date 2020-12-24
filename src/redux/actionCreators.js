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
  channel: channelName,
  connection,
}) => {
  try {

    const host = connection.options.host;

    const channel = connection.channel(channelName);

    channel.join();

    const users = channel.users;

    return {
      type: actionTypes.JOIN,
      payload: {
        channel,
        users,
        host
      },
    }

  } catch (error) {
    console.log(error);
  }
}