import { Connection } from "./connect";
import { JoinIntent } from "./join";
import { User } from "./user";

export interface ConnectionSuccessPayload {
    server: Connection;
    connection: any;
}
export interface DisconnectPayload {
    host: string;
    removeAfterDisconnect?: boolean
}
export interface KickSuccessPayload {
    host: string;
    channel: string;
    nick: string;
    kicked: string;
    message?: string;
}
export interface UserInfoSuccessPayload {
    channel: string;
    users: Array<User>;
    host: string;
}
export interface UserPartSuccessPayload {
    channel: string;
    nick: string;
    host: string;
}
export interface JoinSuccessPayload extends JoinIntent {
    nick: string;
    ident: string;
    hostname: string;
}

