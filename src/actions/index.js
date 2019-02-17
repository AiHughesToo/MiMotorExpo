import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER,
         LOGIN_USER_SUCCESS, LOGIN_BLANK_ERROR,
         LOGIN_USER_FAIL, SELECT_MOTOR, SELECT_CLIENT,
         NAME_CHANGED, REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from './types';

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

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
 };
};
// async call with ajax requires redux thunk and a function is passed dispatch
// this allows us to call dispatch at a later time when the request completes
// ie we can dispatch the action after the return from the call.
export const loginUser = ({ email, password }) => {

  if (email == '' || password == '') {
    return { type: LOGIN_BLANK_ERROR, payload: {error: 'email or password is blank.'} };
  }
  return (dispatch) => {
// we dispatch this to set the loading spinner
    dispatch({ type: LOGIN_USER });
// lets log in the user when you press the button
    fetch('https://memotor-dev.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': email, 'password': password })
    })
    .then((response) => response.json())
    .then(response => loginUserSuccess(dispatch, response));
  };
};

export const selectMotor = () => {
  return (dispatch) => { dispatch({ type: SELECT_MOTOR });
  };
};
export const selectClient = () => {
  return (dispatch) => { dispatch({ type: SELECT_CLIENT });
  };
};

export const registerUser = ({ email, password, name, accountType }) => {
  if (email == '' || password == '' || name == '' || accountType == '') {
    return { type: LOGIN_BLANK_ERROR, payload: {error: 'All fileds are required.'} };
  }
  return (dispatch) => {
  // we dispatch this to set the loading spinner
    dispatch({ type: LOGIN_USER });
  // lets login the user when you press the button
    fetch('https://memotor-dev.herokuapp.com/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': email, 'password': password , name: name, account_type: accountType })
    })
    .then((response) => response.json())
    .then(response => registerUserSuccess(dispatch, response));
  };
};

// below here are helper methods that are not exported.
const registerUserSuccess = (dispatch, response) => {
    console.log(response);
  if (!response.id) {
    dispatch({ type: REGISTER_USER_FAIL });
  }

  if (response.id) {
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: { user: response}});
    Keyboard.dismiss();
    Actions.login();
  }

};
const loginUserSuccess = (dispatch, response) => {

  if (response.errors) {
    dispatch({ type: LOGIN_USER_FAIL });
  }

  if (response.token) {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { token: response.token,
                user_type: response.user_type,
                userName: response.user_name,
                loading: false }});
    Keyboard.dismiss();
    if (response.user_type == 'rider') {
      let token = response.token
      Actions.rider();
    }
// need a function to check for open jobs and an action to set the userStage to level 4
// need to tell user that must mark old job complete before you can make a new one.
    if (response.user_type == 'client') {
      Actions.client();
    }
  }
};
