import { ChannelName, Host, Hostname, Ident, Message, Motd, Nick, Tags, Target, Time } from "./common";
import { User } from "./user"

export interface MessageEvent {
    nick: Nick;
    ident: Ident;
    hostname: Hostname;
    target: Target;
    message: Message;
    tags: Tags;
    time: Time;
}
export interface KickEvent {
    kicked: string,
    nick: Nick,
    ident: Ident,
    hostname: Hostname,
    channel: ChannelName,
    message: Message,
    time: Time,
    tags: Tags
}

export interface UserPartEvent {
    nick: Nick,
    ident: Ident,
    hostname: Hostname,
    channel: ChannelName,
    message: Message,
    time: Time,
    tags: Tags
}

export interface WhoListEvent {
    target: string,
    users: any[]
}


export interface UserListEvent {
    channel: ChannelName,
    users: User[]
}
export interface JoinEvent {
    account: boolean,
    nick: Nick,
    ident: Ident,
    hostname: Hostname,
    gecos: string,
    channel: ChannelName,
    time: Time,
}
export interface MotdEvent {
    motd: Motd,
    tags?: any
}
export interface ListenerEventPayload {
    host: Host;
}
