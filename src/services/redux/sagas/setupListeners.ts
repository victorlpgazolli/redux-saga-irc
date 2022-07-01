
import { fork, } from "redux-saga/effects";

import watchForUserListEvent from "./userListEvent";
import watchForJoinEvent from "./joinEvent";
import watchForPartEvent from "./partEvent";
import watchForUserInfo from "./userInfoEvent";
import watchForKickEvent from "./kickEvent";
import watchForMotdEvent from "./motdEvent";
import { PayloadAction } from "@reduxjs/toolkit";
import { Connect } from "@types";






export default function* setupListeners({ payload }: PayloadAction<Connect.Connection>) {
    const {
        host
    } = payload

    yield fork(watchForJoinEvent, { host });
    yield fork(watchForPartEvent, { host })
    yield fork(watchForUserListEvent, { host });
    yield fork(watchForUserInfo, { host });
    yield fork(watchForKickEvent, { host });
    yield fork(watchForMotdEvent, { host });

}