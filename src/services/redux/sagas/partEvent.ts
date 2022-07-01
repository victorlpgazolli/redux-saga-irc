import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"



const partChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("part", emitter)

        return () => {
            connection.removeListener("part", emitter)
        }
    })


export default function* watchForPartEvent({ host }: EventsTypes.ListenerEventPayload) {
    const partEvent = yield call(partChannel, ircClient)

    while (true) {
        const part: EventsTypes.UserPartEvent = yield take(partEvent);

        const userPartPayload: ActionsTypes.UserPartSuccessPayload = {
            channel: part.channel,
            nick: part.nick,
            host,
        }

        yield put({ type: ircActions.user_part.type, payload: userPartPayload });

    }
}