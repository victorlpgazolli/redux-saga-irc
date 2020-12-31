import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/";
import { ircActionCreators } from 'react-irc'
import { render } from "react-dom";

const connection = {
    host: "localhost",
    port: 6667,
    username: "reactIrc"
}
const channel = {
    name: "ircIsAwesome"
}
const toastHandlerExample = val => console.log(JSON.stringify(val))

const MyComponent = () => {
    const [exampleLogs, setLogs] = useState([])
    const {
        channels,     // channels by host
        connections,  // connections by host
        servers,      // connections by host
        users,        // users by host
        errors,       // errors by host
    } = useSelector(state => state.irc);

    const dispatch = useDispatch();

    useEffect(() => {
        setLogs(logs => [...logs, `Connecting to ${connection.host}...`]);
        connectToServer().then(() => {
            setLogs(logs => [...logs, `Connected!!!`]);

            setLogs(logs => [...logs, `Now, lets join ${channel.name}`]);
            joinChannel();

            setTimeout(() => {
                setLogs(logs => [...logs, `Leaving ${channel.name}`]);
                leaveChannel()
            }, 4000);

            setTimeout(() => {
                setLogs(logs => [...logs, `Disconnecting from ${connection.host}`]);
                disconnectFromServer()
            }, 8000);

        });

    }, [
        connectToServer,
        disconnectFromServer,
        joinChannel,
        leaveChannel,
        connection,
        channel
    ])


    // ERROR HANDLERS
    useEffect(() => {
        const errorPerHost = errors[connection?.host]

        if (errorPerHost) {
            toastHandlerExample({
                type: 'error',
                title: errorPerHost.error,
                description: errorPerHost.reason,
            })

            // remove error after showing error to user
            dispatch(ircActionCreators.removeError(connection))
        }

    }, [connection, dispatch, ircActionCreators, JSON.stringify(errors)])


    // CONNECT EXAMPLE
    const connectToServer = useCallback(async () => {

        const ircConnection = await ircActionCreators.connect({
            host: connection.host,
            port: connection.port,
            username: connection.username,
            connectionTimeout: 10000, // 10 seconds
            useMiddleware: true, // Recommended
            suppressMiddlewareErrors: true, // Recommended
        })(dispatch);

        dispatch(ircConnection);

    }, [ircActionCreators, dispatch]);



    // DISCONNECT EXAMPLE
    const disconnectFromServer = useCallback(() => {
        dispatch(ircActionCreators.disconnect({
            host: connection.host,
            removeAfterDisconnect: true
        }));

    }, [ircActionCreators, dispatch]);




    // JOIN EXAMPLE
    const joinChannel = useCallback(() => {

        dispatch(ircActionCreators.join({
            channel: channel.name,
            host: connection.host
        }));

    }, [ircActionCreators, dispatch, channel, connection]);




    // LEAVE EXAMPLE
    const leaveChannel = useCallback(() => {

        dispatch(ircActionCreators.leave({
            channel: channel.name,
            host: connection.host
        }));

    }, [ircActionCreators, dispatch, channel, connection]);

    return (
        <>
            <h1>hi, see the console</h1>
            {
                exampleLogs.map(log => <p>{log}</p>)
            }
        </>
    )
}
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MyComponent />
            </PersistGate>
        </Provider>
    );
}
render(<App />, document.getElementById('root'))
