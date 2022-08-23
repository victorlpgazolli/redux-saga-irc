
export const whoIsInChannel = ({
    connection,
    channel
}) => {

    connection.who(channel)

}
