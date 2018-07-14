import { Alert } from 'react-native';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER, LOGIN_USER_SUCCESS } from './types';

// this is an action creator
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
 };
};
// async call with ajax requires redux thunk and a function is passed dispatch
// this allows us to call dispatch at a later time when the request completes
// ie we can dispatch the action after the return from the call.
export const loginUser = ({ email, password }) => {

  return (dispatch) => {
// we dispatch this to set the loading spinner
    dispatch({ type: LOGIN_USER });
// lets login the user when you press the button
    fetch('https://memotor-dev.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': email, 'password': password })
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { token: response.token, user_type: response.user_type, loading: false }})
    });
  };
};
