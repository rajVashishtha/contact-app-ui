import userReducer from './user/user.reducer'
import activeTabReducer from './active-tab/active-tab.reducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    user : userReducer,
    activeTab: activeTabReducer
})

export default rootReducer
