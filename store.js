//Dependencies
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//Reducers
import users from './components/Users/reducer'
import counter from './components/Counter/reducer'
import dataAPI from './components/DataAPI/reducer'
import auth from './components/Auth/reducer'
import countries from './components/Countries/reducer'

const reducer = combineReducers({
  users, counter, dataAPI, auth, countries
})

export const initStore = (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
};
