
import { PayloadAction } from "@reduxjs/toolkit";
import { fromEvent, } from "rxjs";
import { call, fork, put, select, take } from "redux-saga/effects";
import { ircActions } from "@app";
import { eventChannel } from "redux-saga";
import { ircClient } from "@services/irc";

interface JoinEvent {
    account: boolean,
    nick: string,
    ident: string,
    hostname: string,
    gecos: string,
    channel: string,
    time: number,
}
// users: [
//   {
//     nick: 'teste',
//     ident: 'teste',
//     hostname: '172.19.0.1',
//     modes: [],
//     tags: [Object]
//   },
//   {
//     nick: 'vtr',
//     ident: 'vtr',
//     hostname: '172.19.0.1',
//     modes: [Array],
//     tags: [Object]
//   }
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
interface UserPartEvent {
    nick: string,
    ident: string,
    hostname: string,
    channel: string,
    message: string,
    time: number,
    tags: any
}  

const joinChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("join", emitter)

        return () => {
            connection.removeListener("join", emitter)
        }
    })
const userListChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("userlist", emitter)

        return () => {
            connection.removeListener("userlist", emitter)
        }
    })
const partChannel = (connection) =>
    eventChannel((emitter) => {
        connection.on("part", emitter)

        return () => {
            connection.removeListener("part", emitter)
        }
    })

function* watchForJoinEvent({ host }) {
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

        yield put({ type: ircActions.joinSuccess.type, payload: joinSuccessPayload });

    }
}

function* watchForUserListEvent({ host }) {
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
function* watchForPartEvent({ host }) {
    const partEvent = yield call(partChannel, ircClient)

    while (true) {
        const part: UserPartEvent = yield take(partEvent);

        const userPartPayload = {
            channel: part.channel,
            nick: part.nick,
            host,
        }

        yield put({ type: ircActions.user_part.type, payload: userPartPayload });

    }
}
export default function* setupListeners({ payload }) {
    const {
        server: {
            host
        }
    } = payload

    yield fork(watchForJoinEvent, { host });
    yield fork(watchForPartEvent, { host })
    yield fork(watchForUserListEvent, { host });

}