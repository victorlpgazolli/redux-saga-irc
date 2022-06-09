import { all, takeEvery } from 'redux-saga/effects'
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
        takeEvery("*", console.log)
    ])
}
