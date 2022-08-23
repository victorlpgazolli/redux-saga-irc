import { PayloadAction } from "@reduxjs/toolkit"
import { ActionsTypes, RootState } from "@types"

export default (state: RootState, action: PayloadAction<ActionsTypes.UserPartSuccessPayload>) => {
    const {
        channel,
        nick,
        host,
    } = action.payload;

    const hasHost = state.users && state.users.hasOwnProperty(host) && Array.isArray(state.users[host])

    if (!hasHost) return state;

    const usersFromHost = state.users[host] || [];

    const usersWithoutPartedUser = usersFromHost.filter(user => {
        const isSameChannel = user.channel === channel;
        const isSameNick = user.nick === nick;
        const hasToRemoveUser = !!isSameNick && !!isSameChannel;
        const userReimainsInList = !hasToRemoveUser
        return userReimainsInList;
    });

    return {
        ...state,
        users: {
            ...state.users,
            [host]: usersWithoutPartedUser,
        },
    }
}