export default (state, action) => {
    const {
        channel: channelName,
        host,
    } = action.payload;

    const hasHost = state.channels && state.channels.hasOwnProperty(host) && Array.isArray(state.channels[host])

    if (!hasHost) return state;

    const channels = state.channels[host];

    const channelIndex = channels.findIndex(({ name }) => name === channelName);

    const [channel] = channels.splice(channelIndex, 1)

    channel.part();

    return {
        ...state,
        channels: {
            ...state.channels,
            [host]: channels,
        },
    }
}