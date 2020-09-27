import { combineReducers } from 'redux'
import AdminReducer from './Admin'
import VisitorReducer from './Visitor'

export default combineReducers({ AdminReducer, VisitorReducer })
