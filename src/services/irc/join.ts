import { ircClient, IRC_CONNECTION_TIMEOUT } from ".";

interface Join {
    connection: any
    channel: string
}
export const join = ({
    connection,
    channel
}: Join): Promise<true> => new Promise((resolve, reject) => {
    const hasHash = channel.startsWith("#");

    const channelName = hasHash
        ? channel
        : `#${channel}`;

    connection.join(channelName)

    resolve(true)
})
