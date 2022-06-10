import connectedReducer from './connected'
import disconnectReducer from './disconnect'
import joinReducer from './join'
import partReducer from './part'
import kickReducer from './kick'
import privmsgReducer from './privmsg'
import quitReducer from './quit'
import userListReducer from './userList'
import userPartReducer from './userPart'


const reducers = {
    connectedReducer,
    disconnectReducer,
    joinReducer,
    partReducer,
    kickReducer,
    privmsgReducer,
    quitReducer,
    userListReducer,
    userPartReducer,
}
export default reducers