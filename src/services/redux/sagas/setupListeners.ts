
import { fromEvent, } from "rxjs";
import { call, fork, put, select, take } from "redux-saga/effects";

import watchForUserListEvent from "./userListEvent";
import watchForJoinEvent from "./joinEvent";
import watchForPartEvent from "./partEvent";
import { eventChannel } from "redux-saga";
import { ircClient } from "@services/irc";
import { ircActions } from "@app";
import watchForUserInfo from "./userInfoEvent";
import watchForKickEvent from "./kickEvent";






export default function* setupListeners({ payload }) {
    const {
        host
    } = payload

    yield fork(watchForJoinEvent, { host });
    yield fork(watchForPartEvent, { host })
    yield fork(watchForUserListEvent, { host });
    yield fork(watchForUserInfo, { host });
    yield fork(watchForKickEvent, { host });

}