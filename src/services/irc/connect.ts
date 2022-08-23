import { Connect } from "@types";
import { ircClient, IRC_CONNECTION_TIMEOUT } from ".";

export const connect = ({
    host,
    port,
    nick,
    username,
}: Connect.Connection): Connect.ConnectIrc => new Promise((resolve, reject) => {

    const connectionPayload = {
        host,
        port,
        nick: nick || username,
        username,
    }

    ircClient.connect(connectionPayload);

    const removeListenerAndResolve = () => {
        ircClient.removeListener("registered", resolve)
        ircClient.removeListener("connect", resolve);
        resolve({
            server: connectionPayload,
            connection: ircClient
        })
    };

    ircClient.on('registered', removeListenerAndResolve);
    ircClient.on('connect', removeListenerAndResolve);

    setTimeout(() => {
        reject("irc timeout")
    }, IRC_CONNECTION_TIMEOUT);
})
