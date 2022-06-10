import { createReducer } from "@reduxjs/toolkit";
import { ircActions } from "@app";
import reducers from "./reducers";
import { user_part } from "./actions";

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
} = ircActions;

const operationStates = {
    loadLoading: false,
    loadSuccess: false,
    loadFail: false,
}

const INITIAL_STATE = {
    servers: {},
    users: {},
    channels: {},
    connections: {},
    errors: {},
    ...operationStates
};

export default createReducer(INITIAL_STATE, {
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
    [motd.type]: state => state,
    [topic.type]: state => state,
    [user_list.type]: reducers.userListReducer,
    [user_part.type]: reducers.userPartReducer,
    [user_kick.type]: reducers.kickReducer,
    [mode.type]: state => state,
    [irc_error.type]: state => state,
})
