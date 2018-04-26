import * as types from './action_types';
import SessionApi from '../api/session_api';


export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {
  return function(dispatch) {
      return SessionApi.login(credentials).then(response => {
          const jwt = response.data.jwt
          if(response.hasOwnProperty('data')){
              SessionApi.getMe(jwt).then(response => {
                  console.log(response);
                  if(response.data !== null){
                      const sess = {
                          jwt:jwt,
                          user:response.data.user
                      };

                      sessionStorage.setItem('session',JSON.stringify(sess));
                      console.log(sess);
                      dispatch(loginSuccess());
                  }
              }).catch(error => {
                 throw(error);
              });

          }

      }).catch(error => {
          throw(error);
      });
  };
}

export function updateUser(user){

}

export function logOutUser() {
  sessionStorage.removeItem('session');
  return {type: types.LOG_OUT}
}
