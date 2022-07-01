import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"


const whoIsEvent = (connection) =>
    eventChannel((emitter) => {
        connection.on("wholist", emitter)

        return () => {
            connection.removeListener("wholist", emitter)
        }
    })



export default function* watchForUserInfo({ host }: EventsTypes.ListenerEventPayload) {
    const whoIs = yield call(whoIsEvent, ircClient)

    while (true) {
        const usersInfo: EventsTypes.WhoListEvent = yield take(whoIs);

        const userInfoPayload: ActionsTypes.UserInfoSuccessPayload = {
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