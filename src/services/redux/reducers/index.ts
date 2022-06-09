import connectedReducer from './connected'
import disconnectReducer from './disconnect'
import joinReducer from './join'
import partReducer from './part'
import kickReducer from './kick'
import privmsgReducer from './privmsg'
import quitReducer from './quit'


const reducers = {
    connectedReducer,
    disconnectReducer,
    joinReducer,
    partReducer,
    kickReducer,
    privmsgReducer,
    quitReducer
}
export default reducers