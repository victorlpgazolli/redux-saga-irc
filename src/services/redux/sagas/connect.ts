import { call, put, select } from "redux-saga/effects";
import * as yup from 'yup';
import { ircActions } from "@app";
import { connect } from "@services/irc";
import { PayloadAction } from "@reduxjs/toolkit";
const connectionSchema = yup.object().shape({
    host: yup.string().required("payload.host is required"),
    port: yup.number().required("payload.port must be a number").positive().integer(),
    nick: yup.string(),
    username: yup.string().required("payload.username is required"),
});
interface Connection {
    host: string
    port: number
    nick: string
    username: string
}

export default function* connectToIrc(action: PayloadAction<Connection>) {
    connectionSchema.validateSync(action.payload);

    const {
        host,
        port,
        nick,
        username,
    } = action.payload

    const connectionPayload = {
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

        yield put({
            type: ircActions.join.type,
            payload: {
                host: host,
                channel: "abc"
            }
        });

    } catch (error) {
        console.log(error);

    }

}