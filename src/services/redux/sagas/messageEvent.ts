import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"


const messageEvent = (connection) =>
    eventChannel((emitter) => {
        connection.on("action", emitter)

        return () => {
            connection.removeListener("action", emitter)
        }
    })



export default function* watchForMessageEvent({ host }: EventsTypes.ListenerEventPayload) {
    const messageChannel = yield call(messageEvent, ircClient)

    while (true) {
        const message: EventsTypes.MessageEvent = yield take(messageChannel);

        const userMessagePayload: ActionsTypes.MessageSuccessPayload = {
            host,
            nick: message.nick,
            ident: message.ident,
            hostname: message.hostname,
            target: message.target,
            message: message.message,
            tags: message.tags,
            time: message.time,
        }

        yield put({
            type: ircActions.message.type,
            payload: userMessagePayload
        });
    }
}