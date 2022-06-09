
import { PayloadAction } from "@reduxjs/toolkit";
import { fromEvent, } from "rxjs";
import { call, fork, put, take } from "redux-saga/effects";
import { ircActions } from "@app";
import { eventChannel } from "redux-saga";
import { ircClient } from "@services/irc";


const joinListener = (connection) =>
    eventChannel((emitter) => {
        connection.on("join", emitter)

        return () => {
            console.log("unsubs");
            connection.removeListener("join", emitter)
        }
    })

export default function* setupListeners({ payload }) {


    const joinSubscription = yield call(joinListener, ircClient)

    yield fork(
        function* () {
            while (true) {
                console.log("while");

                const joinedChannel = yield take(joinSubscription)
                console.log("foi");
                yield put({ type: ircActions.joinSuccess, payload: joinedChannel })
            }
        }
    )

}