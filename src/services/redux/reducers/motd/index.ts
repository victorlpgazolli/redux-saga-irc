import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsTypes, RootState } from "@types";

export default (state: RootState, action: PayloadAction<ActionsTypes.MotdSuccessPayload>) => {
    const {
        motd,
        host
    } = action.payload;

    const serverInfo = state.servers[host] || {}

    return {
        ...state,
        servers: {
            ...state.servers,
            [host]: {
                ...serverInfo,
                motd: motd
            },
        },
    }
}