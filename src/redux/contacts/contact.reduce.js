const INITIAL_STATE = {
    contacts : []
}

const contactReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_CONTACTS' : 
            return{
                ...state,
                contacts : action.payload
            }
        default:
            return state
    }
}

export default contactReducer;