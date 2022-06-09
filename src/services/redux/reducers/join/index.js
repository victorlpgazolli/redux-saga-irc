export default (state, action) => {
    const {
        channel: channelName,
        host,
    } = action.payload;

    const hasHost = state.connections && state.connections.hasOwnProperty(host);

    if (!hasHost) return state;

    const channel = state.connections[host].channel(channelName);

    channel.join();

    const users = channel.users;

    const channels = state.channels[host] || [];

    return {
        ...state,
        channels: {
            ...state.channels,
            [host]: [...channels, channel],
        },
        users: {
            ...state.users,
            [host]: users
        }
    }
}