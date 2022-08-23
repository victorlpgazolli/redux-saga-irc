
import { call, fork, } from "redux-saga/effects";
import { ircClient } from "@services/irc";
import { whoIsInChannel } from "@services/irc/whoIs";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsTypes } from "@types";


function* whoIsCommandSender({ channel }) {
    yield call(whoIsInChannel, { connection: ircClient, channel })
}


export default function* fireWhoIsCommand({ payload }: PayloadAction<ActionsTypes.JoinSuccessPayload>) {
    const {
        channel
    } = payload;

    yield fork(whoIsCommandSender, { channel })

}