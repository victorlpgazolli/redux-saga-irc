import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { ActionsTypes, EventsTypes } from "@types"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"



const userListChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("userlist", emitter)

        return () => {
            connection.removeListener("userlist", emitter)
        }
    })

export default function* watchForUserListEvent({ host }: EventsTypes.ListenerEventPayload) {
    const userListEvent = yield call(userListChannel, ircClient)

    while (true) {
        const userList: EventsTypes.UserListEvent = yield take(userListEvent);

        const userListPayload: ActionsTypes.UserListSuccessPayload = {
            channel: userList.channel,
            users: userList.users,
            host
        }
        yield put({ type: ircActions.user_list.type, payload: userListPayload });

    }
}