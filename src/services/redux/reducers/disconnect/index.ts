import { PayloadAction } from "@reduxjs/toolkit";
import { RootState, ActionsTypes } from "@types";

export default (state: RootState, action: PayloadAction<ActionsTypes.DisconnectPayload>) => {
    const {
        host,
        removeAfterDisconnect,
    } = action.payload;

    const hasHost = state.connections && state.connections.hasOwnProperty(host);

    if (!hasHost) return state;

    state.connections[host].quit();

    if (removeAfterDisconnect) {
        delete state.servers[host]
        delete state.channels[host]
        delete state.users[host]
        delete state.connections[host]
    }

    return state
}