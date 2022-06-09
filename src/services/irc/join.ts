import { ircClient, IRC_CONNECTION_TIMEOUT } from ".";

export const join = ({
    connection,
    channel: channelName
}) => new Promise((resolve, reject) => {
    connection.join(channelName)
    console.log({ channelName });
    resolve(true)
})
