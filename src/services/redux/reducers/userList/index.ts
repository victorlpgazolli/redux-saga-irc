import { PayloadAction } from "@reduxjs/toolkit"
import { ActionsTypes, RootState } from "@types"

export default (state: RootState, action: PayloadAction<ActionsTypes.UserListSuccessPayload>) => {
    const {
        channel = "",
        users = [],
        host,
    } = action.payload;

    const userWithChannel = users.map(user => ({
        ...user,
        channel
    }));

    return {
        ...state,
        users: {
            ...state.users,
            [host]: userWithChannel,
        },
    }
}