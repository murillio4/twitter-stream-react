import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import tweet from '../reducers/Tweet';
import filter from '../reducers/Filter';

const rootReducer = combineReducers({
  tweet: tweet,
  filter: filter,
  routing: routerReducer
});

export const history = createHistory();

const middleware = routerMiddleware(history);

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, middleware)
);
