import { Host, Nick, Port, Username } from "./common";
import { ConnectionSuccessPayload } from "./actions"

export interface Server {
    host: Host
    port: Port
}
export interface Connection extends Server {
    nick?: Nick
    username: Username
}
export type ConnectIrc = Promise<ConnectionSuccessPayload>
