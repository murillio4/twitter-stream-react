import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from '../reducers'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const rootReducer =  combineReducers({
    twitter: reducers,
    routing: routerReducer
  })

export const history = createHistory()
  
const middleware = routerMiddleware(history)

export const store = createStore(rootReducer, applyMiddleware(thunk, middleware));
