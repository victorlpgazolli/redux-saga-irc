import { all, select, takeEvery } from 'redux-saga/effects'
import {
    watchJoinIntent,
    watchConnectionIntent,
    watchConnecting,
    watchConnected,
    watchJoinedChannel,
} from './sagas'


export default function* rootSaga() {
    yield all([
        watchJoinedChannel(),
        watchConnected(),
        watchConnecting(),
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
