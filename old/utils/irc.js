import { Client } from "irc-framework/src";

const ircClient = new Client();
export const IRC_CONNECTION_TIMEOUT = 25000;

export const connect = ({
    host,
    port,
    nick,
    username,
}) => new Promise((resolve, reject) => {

    const connectionPayload = {
        host,
        port,
        nick,
        username,
    }

    ircClient.connect(connectionPayload);

    const removeListenerAndResolve = (...payload) => {
        ircClient.removeListener("registered", resolve)
        ircClient.removeListener("connect", resolve);
        resolve(...payload)
    };

    ircClient.on('registered', removeListenerAndResolve);
    ircClient.on('connect', removeListenerAndResolve);

    setTimeout(() => {
        reject("irc timeout")
    }, IRC_CONNECTION_TIMEOUT);
})
