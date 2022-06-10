import { createAction } from "@reduxjs/toolkit";

export const connecting = createAction('@@irc-server/CONNECTING');
export const connectionError = createAction('@@irc-server/CONNECTION_ERROR');
export const connect = createAction('@@irc-server/CONNECT');
export const connected = createAction('@@irc-server/CONNECTED')
export const disconnect = createAction('@@irc-server/DISCONNECT')
export const joinRequest = createAction('@@irc-server/JOIN_REQUEST')
export const joinLoading = createAction('@@irc-server/JOIN_LOADING')
export const joinSuccess = createAction('@@irc-server/JOIN_SUCCESS')
export const part = createAction('@@irc-server/PART')
export const kick = createAction('@@irc-server/KICK')
export const quit = createAction('@@irc-server/QUIT')
export const nick = createAction('@@irc-server/NICK')
export const privmsg = createAction('@@irc-server/PRIVMSG')
export const remove_error = createAction('@@irc-server/REMOVE_ERROR')
export const motd = createAction('@@irc-server/MOTD')
export const topic = createAction('@@irc-server/TOPIC')
export const user_list = createAction('@@irc-server/USER_LIST')
export const user_part = createAction('@@irc-server/USER_PART')
export const mode = createAction('@@irc-server/MODE')
export const irc_error = createAction('@@irc-server/IRC_ERROR')

