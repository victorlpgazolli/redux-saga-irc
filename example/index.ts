import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { ircReducer, createSagaMiddleware, ircSagas, ircActions } from "@app";

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    combineReducers({
        irc: ircReducer
    }),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(ircSagas)


console.log(store.getState());
console.log(store.dispatch({
    type: ircActions.connect.type, payload: {
        host: "127.0.0.1",
        port: 6667,
        username: "teste",
    }
}));
console.log(store.getState());

// store.dispatch({
//     type: ircActions.join.type,
//     payload: {
//         host: "127.0.0.1",
//         channel: "abc"
//     }
// })
