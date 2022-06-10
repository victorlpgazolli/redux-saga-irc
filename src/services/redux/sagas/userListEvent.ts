import { ircActions } from "@app"
import { ircClient } from "@services/irc"
import { eventChannel } from "redux-saga"
import { call, put, take } from "redux-saga/effects"

interface User {
    nick: string,
    ident: string,
    hostname: string,
    modes: string[],
    tags: any
}
interface UserListEvent {
    channel: string,
    users: User
}

const userListChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("userlist", emitter)

        return () => {
            connection.removeListener("userlist", emitter)
        }
    })

export default function* watchForUserListEvent({ host }) {
    const userListEvent = yield call(userListChannel, ircClient)

    while (true) {
        const userList: UserListEvent = yield take(userListEvent);

        const userListPayload = {
            channel: userList.channel,
            users: userList.users,
            host
        }
        yield put({ type: ircActions.user_list.type, payload: userListPayload });

    }
}