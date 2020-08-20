const INITIAL_STATE = {
    currentActiveTab : "Contact"
}

const activeTabReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_ACTIVE_TAB' : 
            return{
                ...state,
                currentActiveTab : action.payload
            }
        default:
            return state
    }
}

export default activeTabReducer;