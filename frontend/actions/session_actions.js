import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  
  return {
  type: RECEIVE_CURRENT_USER,
  currentUser
}};

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = (errors) => {
  return {
  type: RECEIVE_SESSION_ERRORS,
  errors
  }
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const login = (user) => {
  
  return (dispatch) => {
    SessionApiUtil.login(user).then((user) => {
      dispatch(receiveCurrentUser(user))
    },(error) => {
      
      dispatch(receiveErrors(error.responseJSON))
    })
  }
}

export const signup = (currentUser) => {
  return (dispatch) => {
     SessionApiUtil.signup(currentUser).then((currentUser) => {
       dispatch(receiveCurrentUser(currentUser));
    }, (error) => {
      dispatch(receiveErrors(error.responseJSON))
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return SessionApiUtil.logout().then(() => {
      return dispatch(logoutCurrentUser());
    });
  };
};
