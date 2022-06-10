import { all, select, takeEvery } from 'redux-saga/effects'
import {
    watchJoinIntent,
    watchConnectionIntent,
    watchConnected
} from './sagas'


export default function* rootSaga() {
    yield all([
        watchConnected(),
        watchConnectionIntent(),
        watchJoinIntent(),
        takeEvery("*", function* (action) {
            console.log(
                action,
                yield select(state => state.irc),
                yield select(state => state.irc.users),
            )
        })
    ])
}
