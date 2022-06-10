
import { fromEvent, } from "rxjs";
import { call, fork, put, select, take } from "redux-saga/effects";

import watchForUserListEvent from "./userListEvent";
import watchForJoinEvent from "./joinEvent";
import watchForPartEvent from "./partEvent";
import { eventChannel } from "redux-saga";
import { ircClient } from "@services/irc";
import { ircActions } from "@app";
import { whoIsInChannel } from "@services/irc/whoIs";


function* whoIsCommandSender({ channel }) {
    yield call(whoIsInChannel, { connection: ircClient, channel })
}


export default function* fireWhoIsCommand({ payload }) {
    const {
        channel
    } = payload;

    yield fork(whoIsCommandSender, { channel })

}