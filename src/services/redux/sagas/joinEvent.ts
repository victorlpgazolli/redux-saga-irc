import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"

const joinChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("join", emitter)

        return () => {
            connection.removeListener("join", emitter)
        }
    })

export default function* watchForJoinEvent({ host }: EventsTypes.ListenerEventPayload) {
    const joinSubscription = yield call(joinChannel, ircClient)

    while (true) {
        const joinedChannel: EventsTypes.JoinEvent = yield take(joinSubscription);

        const joinSuccessPayload: ActionsTypes.JoinSuccessPayload = {
            host,
            channel: joinedChannel.channel,
            nick: joinedChannel.nick,
            ident: joinedChannel.ident,
            hostname: joinedChannel.hostname
        }

        yield put({
            type: ircActions.joinSuccess.type,
            payload: joinSuccessPayload
        });

    }
}