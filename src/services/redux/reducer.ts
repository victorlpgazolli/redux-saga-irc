import { createReducer } from "@reduxjs/toolkit";
import { ircActions } from "@app";
import reducers from "./reducers";

const {
    connected,
    disconnect,
    joinRequest,
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
    joinSuccess,
    user_kick,
    user_part,
    message,
} = ircActions;

const operationStates = {
    loadLoading: false,
    loadSuccess: false,
    loadFail: false,
}

export const INITIAL_STATE = {
    servers: {},
    users: {},
    channels: {},
    connections: {},
    errors: {},
    ...operationStates
};
const rootReducer = createReducer(INITIAL_STATE, {
    [connected.type]: reducers.connectedReducer,
    [disconnect.type]: state => state,
    [joinSuccess.type]: reducers.joinReducer,
    [part.type]: state => state,
    [kick.type]: state => state,
    [quit.type]: state => state,
    [nick.type]: state => state,
    [privmsg.type]: state => state,
    [remove_error.type]: state => state,
    [joinRequest.type]: state => state,
    [part.type]: state => state,
    [motd.type]: reducers.motdReducer,
    [topic.type]: state => state,
    [message.type]: state => state,
    [user_list.type]: reducers.userListReducer,
    [user_part.type]: reducers.userPartReducer,
    [user_kick.type]: reducers.kickReducer,
    [mode.type]: state => state,
    [irc_error.type]: state => state,
})


export default rootReducer
