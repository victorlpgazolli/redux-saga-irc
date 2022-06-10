import { call, put, select } from "redux-saga/effects";
import * as yup from 'yup';
import { ircActions } from "@app";
import { join } from "@services/irc";
import { PayloadAction } from "@reduxjs/toolkit";
const joinSchema = yup.object().shape({
    host: yup.string().required("payload.host is required"),
    channel: yup.string().required("payload.channel is required"),
});
interface JoinIntent {
    host: string
    channel: string
}

export default function* joinChannel(action: PayloadAction<JoinIntent>) {
    joinSchema.validateSync(action.payload);

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