import { ircActions } from "@app"
import { takeEvery, takeLatest } from "redux-saga/effects"
import connectToIrc from "./connect"
import fireWhoIsCommand from "./fireWhoIsCommand"
import joinChannel from "./join"
import setupListeners from "./setupListeners"

export function* watchConnectionIntent() {
    yield takeLatest(ircActions.connect, connectToIrc)
}
export function* watchJoinIntent() {
    yield takeEvery(ircActions.joinRequest, joinChannel)
}
export function* watchConnecting() {
    yield takeEvery(ircActions.connecting, setupListeners)
}
export function* watchConnected() {

}
export function* watchJoinedChannel() {
    yield takeEvery(ircActions.joinSuccess, fireWhoIsCommand)

}