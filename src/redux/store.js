import {createStore, applyMiddleware} from 'redux'

import logger from 'redux-logger'
import rootReducer from './root.reducer'


const middleware = [logger]

const saveToLocalStorage = (state)=>{
    try{
        const serializeState = JSON.stringify(state)
        localStorage.setItem('contact-app-state', serializeState)
    }catch(e){
        console.log(e)
    }
}

const loadFromLocalStorage = ()=>{
    try{
        const serializeState = localStorage.getItem('contact-app-state')
        if(serializeState == null)return undefined
        return JSON.parse(serializeState)
    }catch(e){
        console.log(e)
        return undefined
    }
}

const persistState = loadFromLocalStorage()
const store = createStore(rootReducer,persistState, applyMiddleware(...middleware))
store.subscribe(()=>saveToLocalStorage(store.getState()))
export default store;