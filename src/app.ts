import createSagaMiddleware from '@redux-saga/core';
import * as ircActions from '@services/redux/actions'
import ircSagas from '@services/redux/rootSaga'
import ircReducer from '@services/redux/reducer'


export {
    createSagaMiddleware,
    ircActions,
    ircSagas,
    ircReducer
}