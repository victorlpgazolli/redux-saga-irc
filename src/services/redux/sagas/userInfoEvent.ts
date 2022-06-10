import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"


const whoIsEvent = (connection) =>
    eventChannel((emitter) => {
        connection.on("wholist", emitter)

        return () => {
            connection.removeListener("wholist", emitter)
        }
    })

interface whoList {
    target: string,
    users: Array<any>
}

export default function* watchForUserInfo({ host }) {
    const whoIs = yield call(whoIsEvent, ircClient)

    while (true) {
        const usersInfo: whoList = yield take(whoIs);

        const userInfoPayload = {
            channel: usersInfo.target,
            users: usersInfo.users,
            host
        }
        yield put({
            type: ircActions.user_list.type,
            payload: userInfoPayload
        });
    }
}