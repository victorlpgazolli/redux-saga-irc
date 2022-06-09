import { put, takeEvery, all, race, take, delay, takeLatest, call } from 'redux-saga/effects'
import actions from '../actions'
import { Observable } from 'rxjs';
import connectToIrc from './connect';

function* watchConnectionIntent() {
    yield takeLatest(actions.connect, connectToIrc)
}
// function* watchMOTD() {
//     yield takeEvery(actions.motd, setModt)
// }

export default function* rootSaga() {
    yield all([
        takeEvery("*", console.log),
        watchConnectionIntent(),
    ])
}
