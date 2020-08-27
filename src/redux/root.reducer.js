import userReducer from './user/user.reducer'
import activeTabReducer from './active-tab/active-tab.reducer'
import contactReducer from './contacts/contact.reduce'
import searchReducer from './search/search.reducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    user : userReducer,
    activeTab: activeTabReducer,
    contacts:contactReducer,
    searchText:searchReducer
})

export default rootReducer
