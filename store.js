//Dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//Reducers
import users from './components/Users/reducer'
import counter from './components/Counter/reducer'
import auth from './components/Auth/reducer'
import countries from './components/Countries/reducer'
import shop from './components/Shop/reducer'

const reducer = combineReducers({
  users, counter, auth, countries, shop
})

export const initStore = (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
};
