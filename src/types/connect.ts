import { ConnectionSuccessPayload } from "./actions"

export interface Server {
    host: string
    port: number
}
export interface Connection extends Server {
    nick?: string
    username: string
}
export type ConnectIrc = Promise<ConnectionSuccessPayload>
