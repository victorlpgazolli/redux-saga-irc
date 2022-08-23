import { ChannelName, Host, Hostname, Ident, Message, Motd, Nick, Tags, Target, Time } from "./common";
import { Connection } from "./connect";
import { JoinIntent } from "./join";
import { User } from "./user";

interface CommonPayload {
    host: Host;
}
export interface ConnectionSuccessPayload {
    server: Connection;
    connection: any;
}
export interface DisconnectPayload extends CommonPayload {
    removeAfterDisconnect?: boolean
}
export interface KickSuccessPayload extends CommonPayload {
    channel: ChannelName;
    nick: Nick;
    kicked: string;
    message?: Message;
}
export interface MessageSuccessPayload extends CommonPayload {
    nick: Nick;
    ident: Ident;
    hostname: Hostname;
    target: Target;
    message: Message;
    tags: Tags;
    time: Time;
}
export interface MotdSuccessPayload extends CommonPayload {
    motd: Motd;
}
export interface TopicSuccessPayload extends CommonPayload {
    channel: ChannelName;
    topic: string;
    nick: Nick;
}
export interface UserInfoSuccessPayload extends CommonPayload {
    channel: ChannelName;
    users: User[];
}
export interface UserListSuccessPayload extends UserInfoSuccessPayload { }
export interface UserPartSuccessPayload extends CommonPayload {
    channel: ChannelName;
    nick: Nick;
}
export interface JoinSuccessPayload extends JoinIntent {
    nick: Nick;
    ident: Ident;
    hostname: Hostname;
}

