import { call, put } from "redux-saga/effects";
import actions from "../actions";
import { connect } from "../utils/irc";
import * as yup from 'yup';
const connectionSchema = yup.object().shape({
    host: yup.string().required("payload.host is required"),
    port: yup.number().required("payload.port must be a number").positive().integer(),
    nick: yup.string(),
    username: yup.string().required("payload.username is required"),
});

export default function* connectToIrc(action) {
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

    yield put({ type: actions.connecting, payload: connectionPayload });

    yield call(connect, connectionPayload);

    yield put({ type: actions.connected, payload: connectionPayload });

}