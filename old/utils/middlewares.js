import {
    _middlewareSetMotd,
    _middlewareSetTopic,
} from '../redux/actionCreators';
import assert from 'assert'

export const middleware = (
    dispatch = () => { },
    handlers = {},
    options = {
        suppressMiddlewareErrors: true
    },
) => () => {

    return function (client, raw_events, parsed_events) {
        parsed_events.use(handler);
    }

    function handler(command, event, client, next) {
        try {
            assert(typeof handlers[command] === 'function', `no middleware configured for: ${JSON.stringify(command)}`)
            const dispatchEvent = handlers[command]({
                event,
                client
            });
            if (dispatchEvent) dispatch(dispatchEvent)
        } catch (error) {
            if (!options.suppressMiddlewareErrors) console.log(error);
        }
        finally {
            next();
        }
    }
}