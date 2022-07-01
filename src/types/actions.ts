import { Connection } from "./connect";
import { JoinIntent } from "./join";
import { User } from "./user";

interface CommonPayload {
    host: string;
}
export interface ConnectionSuccessPayload {
    server: Connection;
    connection: any;
}
export interface DisconnectPayload extends CommonPayload {
    removeAfterDisconnect?: boolean
}
export interface KickSuccessPayload extends CommonPayload {
    channel: string;
    nick: string;
    kicked: string;
    message?: string;
}
export interface MotdSuccessPayload extends CommonPayload {
    motd: string;
}
export interface TopicSuccessPayload extends CommonPayload {
    channel: string;
    topic: string;
    nick: string;
}
export interface UserInfoSuccessPayload extends CommonPayload {
    channel: string;
    users: User[];
}
export interface UserListSuccessPayload extends UserInfoSuccessPayload { }
export interface UserPartSuccessPayload extends CommonPayload {
    channel: string;
    nick: string;
}
export interface JoinSuccessPayload extends JoinIntent {
    nick: string;
    ident: string;
    hostname: string;
}

