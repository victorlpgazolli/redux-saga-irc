import { PayloadAction } from "@reduxjs/toolkit";
import { RootState, ActionsTypes } from "@types";

export default (state: RootState, action: PayloadAction<ActionsTypes.ConnectionSuccessPayload>) => {
    const {
        host,
        username,
        port,
    } = action.payload.server || {};

    const hostInfo = state.servers[host] || {}

    return {
        ...state,
        servers: {
            ...state.servers,
            [host]: {
                ...hostInfo,
                host,
                username,
                port,
            },
        },
        connections: {
            ...state.connections,
            [host]: action.payload.connection
        }
    }
}
