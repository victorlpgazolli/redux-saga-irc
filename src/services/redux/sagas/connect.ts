import { call, put, } from "redux-saga/effects";
import { ircActions } from "@app";
import { connect } from "@services/irc";
import { PayloadAction } from "@reduxjs/toolkit";
import { connectionValidator } from "@services/validators";
import { Connect } from "@types";



export default function* connectToIrc(action: PayloadAction<Connect.Connection>) {
    connectionValidator(action.payload);

    const {
        host,
        port,
        nick,
        username,
    } = action.payload

    const connectionPayload: Connect.Connection = {
        host,
        port,
        nick,
        username,
    }

    yield put({ type: ircActions.connecting.type, payload: connectionPayload });

    try {
        const connection = yield call(connect, connectionPayload);

        yield put({
            type: ircActions.connected.type,
            payload: connection
        });

        //! ONLY for debug:
        yield put({
            type: ircActions.joinRequest.type,
            payload: {
                host: host,
                channel: "abc"
            }
        });

    } catch (error) {
        console.log(error);

    }

}