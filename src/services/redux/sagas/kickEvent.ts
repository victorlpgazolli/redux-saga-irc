import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"


const kickEvent = (connection) =>
    eventChannel((emitter) => {
        connection.on("kick", emitter)

        return () => {
            connection.removeListener("kick", emitter)
        }
    })



export default function* watchForKickEvent({ host }) {
    const kickChannel = yield call(kickEvent, ircClient)

    while (true) {
        const kickEvent: EventsTypes.KickEvent = yield take(kickChannel);

        const userKickedPayload: ActionsTypes.KickSuccessPayload = {
            host,
            channel: kickEvent.channel,
            nick: kickEvent.nick,
            kicked: kickEvent.kicked,
            message: kickEvent.message
        }

        yield put({
            type: ircActions.user_kick.type,
            payload: userKickedPayload
        });
    }
}