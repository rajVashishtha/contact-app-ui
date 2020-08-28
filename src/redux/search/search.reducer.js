const INITIAL_STATE = {
    searchText : ""
}

const searchReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_SEARCH_TEXT' : 
            return{
                ...state,
                searchText : action.payload
            }
        default:
            return state
    }
}

export default searchReducer;