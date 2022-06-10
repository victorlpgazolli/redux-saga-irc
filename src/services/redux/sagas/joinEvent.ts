import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"

interface JoinEvent {
    account: boolean,
    nick: string,
    ident: string,
    hostname: string,
    gecos: string,
    channel: string,
    time: number,
}

const joinChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("join", emitter)

        return () => {
            connection.removeListener("join", emitter)
        }
    })

export default function* watchForJoinEvent({ host }) {
    const joinSubscription = yield call(joinChannel, ircClient)

    while (true) {
        const joinedChannel: JoinEvent = yield take(joinSubscription);

        const joinSuccessPayload = {
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