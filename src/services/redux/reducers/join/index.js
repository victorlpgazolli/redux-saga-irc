export default (state, action) => {
    const {
        channel: channelName,
        host,
        nick,
        ident,
        hostname,
    } = action.payload;

    const hasHost = state.connections && state.connections.hasOwnProperty(host);

    if (!hasHost) return state;

    const channel = state.connections[host].channel(channelName);

    const channels = state.channels[host] || [];
    const users = state.users[host] || [];

    return {
        ...state,
        channels: {
            ...state.channels,
            [host]: channels.concat(channel),
        },
        users: {
            ...state.users,
            [host]: users.concat({
                nick,
                ident,
                hostname,
                channel: channelName
            })
        }
    }
}