import {
    _middlewareSetMotd,
    _middlewareSetTopic,
} from '../redux/actionCreators';
import assert from 'assert'

const commands = {
    motd: _middlewareSetMotd,
    topic: _middlewareSetTopic,
}

export const middleware = (dispatch = () => { }) => () => {
    return function (client, raw_events, parsed_events) {
        parsed_events.use(handler);
    }


    function handler(command, event, client, next) {
        try {
            assert(typeof commands[command] === 'function', `no middleware configured for: ${JSON.stringify(command)}`)
            dispatch(commands[command]({
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


var irc_bot = new IRC.Client();
irc_bot.use(ExampleMiddleware());