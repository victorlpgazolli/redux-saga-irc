import {
    _middlewareSetMotd,
    _middlewareSetTopic,
} from '../redux/actionCreators';
import assert from 'assert'


export const middleware = (
    dispatch = () => { },
    handlers = {}
) => () => {

    return function (client, raw_events, parsed_events) {
        parsed_events.use(handler);
    }


    function handler(command, event, client, next) {
        try {
            assert(typeof handlers[command] === 'function', `no middleware configured for: ${JSON.stringify(command)}`)
            dispatch(handlers[command]({
                event,
                client
            }))
        } catch (error) {
            console.log(error);
        }
        finally {
            next();
        }
    }
}