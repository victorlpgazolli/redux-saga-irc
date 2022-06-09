import createSagaMiddleware from 'redux-saga';
import ircActionCreators from './actions';
import ircSagas from './sagas';
import _reducer from './redux/createReducer';

export const createReducer = _reducer;

export const reducer = _reducer

export {
    ircActionCreators,
    ircSagas,
    createSagaMiddleware,
};
