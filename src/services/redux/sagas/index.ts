import { ircActions } from "@app"
import { takeEvery, takeLatest } from "redux-saga/effects"
import connectToIrc from "./connect"
import joinChannel from "./join"
import setupListeners from "./setupListeners"

export function* watchConnectionIntent() {
    yield takeLatest(ircActions.connect, connectToIrc)
}
export function* watchJoinIntent() {
    yield takeEvery(ircActions.joinRequest, joinChannel)
}
export function* watchConnected() {
    yield takeEvery(ircActions.connected, setupListeners)
}