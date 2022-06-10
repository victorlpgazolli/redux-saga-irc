import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"

interface UserPartEvent {
    nick: string,
    ident: string,
    hostname: string,
    channel: string,
    message: string,
    time: number,
    tags: any
}


const partChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("part", emitter)

        return () => {
            connection.removeListener("part", emitter)
        }
    })


export default function* watchForPartEvent({ host }) {
    const partEvent = yield call(partChannel, ircClient)

    while (true) {
        const part: UserPartEvent = yield take(partEvent);

        const userPartPayload = {
            channel: part.channel,
            nick: part.nick,
            host,
        }

        yield put({ type: ircActions.user_part.type, payload: userPartPayload });

    }
}