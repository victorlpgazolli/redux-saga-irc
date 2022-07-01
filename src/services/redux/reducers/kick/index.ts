import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsTypes, RootState } from "@types";

export default (state: RootState, action: PayloadAction<ActionsTypes.KickSuccessPayload>) => {
    const {
        channel,
        kicked,
        host,
    } = action.payload;

    const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

    if (!hasHost) return state;

    const usersFromHost = state.users[host] || [];

    const usersWithoutKickedUser = usersFromHost.filter(user => {
        const isSameChannel = user.channel === channel;
        const isSameNick = user.nick === kicked;
        const hasToRemoveUser = !!isSameNick && !!isSameChannel;
        const userReimainsInList = !hasToRemoveUser
        return userReimainsInList;
    });

    return {
        ...state,
        users: {
            ...state.users,
            [host]: usersWithoutKickedUser,
        },
    }
}