- [install && setup](./setup.md)

## Usage Example

Suppose we have a UI to connect to a IRC server when the page is mounted

```js

import {ircActions} from 'redux-irc';
import {useDispatch} from 'react-redux';

export const MyReactFunction(){
    const dispatch = useDispatch();

    useEffect(() => {
        const connection = {
            host: "127.0.0.1",
            port: 6667,
            username: "teste",
        }

        dispatch({
            type: ircActions.connect, 
            payload: connection
        });

    }, [])
}

```

The Component dispatches a plain Object (of type "connect") action to the Store. 

