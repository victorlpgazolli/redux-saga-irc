import * as ircActionTypes from './redux/actionTypes';
import * as ircActionCreators from './redux/actionCreators';
import _reducer from './redux/createReducer';

export const createReducer = _reducer;

export const reducer = _reducer

export { ircActionCreators, ircActionTypes };
