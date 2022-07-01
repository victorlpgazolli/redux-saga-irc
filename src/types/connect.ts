import { ConnectionSuccessPayload } from "./actions"

export interface Connection {
    host: string
    port: number
    nick?: string
    username: string
}
export type ConnectIrc = Promise<ConnectionSuccessPayload>
