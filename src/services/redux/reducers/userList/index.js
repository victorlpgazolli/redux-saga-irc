export default (state, action) => {
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