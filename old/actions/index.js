import { createAction } from "@reduxjs/toolkit";

const connecting = createAction('@@irc-server/CONNECTING');
const connectionError = createAction('@@irc-server/CONNECTION_ERROR');
const connect = createAction('@@irc-server/CONNECT');
const connected = createAction('@@irc-server/CONNECTED')
const disconnect = createAction('@@irc-server/DISCONNECT')
const join = createAction('@@irc-server/JOIN')
const part = createAction('@@irc-server/PART')
const kick = createAction('@@irc-server/KICK')
const quit = createAction('@@irc-server/QUIT')
const nick = createAction('@@irc-server/NICK')
const privmsg = createAction('@@irc-server/PRIVMSG')
const remove_error = createAction('@@irc-server/REMOVE_ERROR')
const motd = createAction('@@irc-server/MOTD')
const topic = createAction('@@irc-server/TOPIC')
const user_list = createAction('@@irc-server/USER_LIST')
const mode = createAction('@@irc-server/MODE')
const irc_error = createAction('@@irc-server/IRC_ERROR')

export default {
    connectionError,
    connecting,
    connect,
    connected,
    disconnect,
    join,
    part,
    kick,
    quit,
    nick,
    privmsg,
    remove_error,
    motd,
    topic,
    user_list,
    mode,
    irc_error,
}
