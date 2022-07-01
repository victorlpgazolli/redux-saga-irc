import { User } from "./user"

export interface KickEvent {
    kicked: string,
    nick: string,
    ident: string,
    hostname: string,
    channel: string,
    message: string,
    time: number,
    tags: any
}

export interface UserPartEvent {
    nick: string,
    ident: string,
    hostname: string,
    channel: string,
    message: string,
    time: number,
    tags: any
}

export interface WhoListEvent {
    target: string,
    users: Array<any>
}


export interface UserListEvent {
    channel: string,
    users: User
}
export interface JoinEvent {
    account: boolean,
    nick: string,
    ident: string,
    hostname: string,
    gecos: string,
    channel: string,
    time: number,
}
