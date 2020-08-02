import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducers from './Reducers'

export default createStore(reducers, applyMiddleware(promiseMiddleware))
