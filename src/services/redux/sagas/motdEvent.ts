import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"


const motdEvent = (connection) =>
    eventChannel((emitter) => {
        connection.on("motd", emitter)

        return () => {
            connection.removeListener("motd", emitter)
        }
    })



export default function* watchForMotdEvent({ host }: EventsTypes.ListenerEventPayload) {
    const motdChannel = yield call(motdEvent, ircClient)

    while (true) {
        const motdEvent: EventsTypes.MotdEvent = yield take(motdChannel);

        const motdPayload: ActionsTypes.MotdSuccessPayload = {
            host,
            motd: motdEvent.motd
        }

        yield put({
            type: ircActions.motd.type,
            payload: motdPayload
        });
    }
}