import { Client } from "irc-framework/src";
import { connect } from './connect'
import { join } from './join'

const ircClient = new Client();
const IRC_CONNECTION_TIMEOUT = 25000;
export {
    ircClient,
    IRC_CONNECTION_TIMEOUT,
    connect,
    join,
}
