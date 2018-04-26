import {combineReducers} from 'redux';
import session from './session_reducer';

const rootReducer = combineReducers({
  // short hand property names
  session
})

export default rootReducer;
