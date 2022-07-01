import { call, put, select } from "redux-saga/effects";
import { ircActions } from "@app";
import { join } from "@services/irc";
import { PayloadAction } from "@reduxjs/toolkit";
import { joinValidator } from "@services/validators";
import { Join } from "@types";


export default function* joinChannel(action: PayloadAction<Join.JoinIntent>) {
    joinValidator(action.payload)

    const {
        host,
        channel
    } = action.payload

    const joinPayload = {
        host,
        channel
    }

    yield put({ type: ircActions.joinLoading.type, payload: joinPayload });
    const connection = yield select(state => state.irc.connections[host])

    try {
        yield call(join, {
            connection,
            channel
        });

    } catch (error) {
        console.log(error);
    }

}