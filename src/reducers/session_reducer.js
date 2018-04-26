import * as types from '../actions/action_types';
import initialState from './initial_state';

export default function sessionReducer(state = initialState.session, action) {
  switch(action.type) {
    case types.LOG_IN_SUCCESS:
      return !!sessionStorage.session
    case types.LOG_OUT:
     return !!sessionStorage.session
    default:
      return state;
  }
}
