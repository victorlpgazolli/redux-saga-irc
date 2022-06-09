export default (state, action) => {
    const {
        host,
        username,
        port,
        tags,
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
                tags,
            },
        },
        connections: {
            ...state.connections,
            [host]: action.payload.connection
        }
    }
}
