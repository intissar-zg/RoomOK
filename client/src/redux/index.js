import {combineReducers}from 'redux'
import authReducer from './authReducer'
import adminReducer from './adminReducer'
import courseReducer from './courseReducer'
export default combineReducers ({authReducer,adminReducer,courseReducer});