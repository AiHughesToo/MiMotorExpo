import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER,
         LOGIN_USER_SUCCESS, LOGIN_BLANK_ERROR,
         LOGIN_USER_FAIL, SELECT_MOTOR, SELECT_CLIENT,
         NAME_CHANGED, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, 
         LOG_OUT, VIN_CHANGED, PLATE_CHANGED, BIKETYPE_CHANGED, REQUEST_PW_SUCCESS, 
         CODE_CHANGED, SET_LOADING, SET_MY_STATS } from './types';

// this is an action creator
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const codeChanged = (text) => {
  return {
    type: CODE_CHANGED,
    payload: text
  };
};
export const vinChanged = (text) => {
  return {
    type: VIN_CHANGED,
    payload: text
  }
}
export const plateChanged = (text) => {
  return {
    type: PLATE_CHANGED,
    payload: text
  }
}

export const bikeTypeChanged = (text) => {
  return {
    type: BIKETYPE_CHANGED,
    payload: text
  }
}

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

export const setLoading = (loadingState) => {
  console.log(loadingState);
  return {      
      type: SET_LOADING,
      payload: { loading: loadingState}
  };
  
};

export const checkMyStats = ({ token }) => {
  return (dispatch) => {

    fetch('https://memotor-dev.herokuapp.com/mystats', {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((response) => setStats(dispatch, response));
  };
};

const setStats = (dispatch, response) => {
      dispatch({
        type: SET_MY_STATS,
        payload: { life_t_distance: response.life_t_distance, life_t_num_jobs: response.life_t_num_jobs}});
};

export const loginUser = ({ email, password }) => {
  if (email == '' || password == '') {
    return { type: LOGIN_BLANK_ERROR, payload: {error: 'email or password is blank.'} };
  }
  return (dispatch) => {
// we dispatch this to set the loading spinner
    dispatch({ type: LOGIN_USER });

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

export const logOutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOG_OUT });
    Actions.auth();
  }
};

export const selectMotor = () => {
  return (dispatch) => { dispatch({ type: SELECT_MOTOR });
  };
};

export const selectClient = () => {
  return (dispatch) => { dispatch({ type: SELECT_CLIENT });
  };
};

// refactor this to only have 1 if statement. 
export const registerUser = ({ email, password, name, accountType, vin, plate, bikeType}) => {
  if (email == '' || password == '' || name == '' || accountType == '') {
    return { type: LOGIN_BLANK_ERROR, payload: {error: 'All fileds are required.'} };
  } 
  
  if (accountType == 'rider') {
    if (vin == '' || bikeType == ''){
      return { type: LOGIN_BLANK_ERROR, payload: {error: 'All fileds are required.'} };
    }
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
      body: JSON.stringify({ 'email': email, 'password': password , name: name, account_type: accountType, vin_number: vin, plate_number: plate, bike_type: bikeType })
    })
    .then((response) => response.json())
    .then(response => registerUserSuccess(dispatch, response));
  };
};

// below here are helper methods that are not exported.
const registerUserSuccess = (dispatch, response) => {
  if (!response.id) {
    dispatch({ type: REGISTER_USER_FAIL });
  }

  if (response.id) {
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: { user: response }});
    Keyboard.dismiss();
    Actions.login();
  }

};

export const resetPW = ({ password, code }) => {
  if (code == '' || password == '') {
    return { type: LOGIN_BLANK_ERROR, payload: {error: 'code or password is blank.'} };
  }
  return (dispatch) => {
// we dispatch this to set the loading spinner
    dispatch({ type: LOGIN_USER });

    fetch('https://memotor-dev.herokuapp.com/set_pass', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'token': code, 'password': password })
    })
    .then((response) => response.json())
    .then(response => resetPWSuccess(dispatch, response));
  };
};

const resetPWSuccess = (dispatch, response) => {
  if (response.errors) {
    dispatch({
      type: REQUEST_PW_SUCCESS,
      payload: { loading: false, requestSuccess: false}});
  } else {
    dispatch({
      type: REQUEST_PW_SUCCESS,
      payload: { loading: false, requestSuccess: true}});
    Actions.login();
  }
};

export const requestPWToken = ({ email }) => {
  if (email == '') {
    return { type: LOGIN_BLANK_ERROR, payload: {error: 'email or password is blank.'} };
  }
  return (dispatch) => {
// we dispatch this to set the loading spinner
    dispatch({ type: LOGIN_USER });

    fetch('https://memotor-dev.herokuapp.com/reset_password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'email': email })
    })
    .then((response) => response.json())
    .then(response => requestPWSuccess(dispatch, response));
  };
};

const requestPWSuccess = (dispatch, response) => {
  if (response.errors) {
    dispatch({
      type: REQUEST_PW_SUCCESS,
      payload: { loading: false, requestSuccess: false}});
  } else {
    dispatch({
      type: REQUEST_PW_SUCCESS,
      payload: { loading: false, requestSuccess: true}});
    Keyboard.dismiss();
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
    if (response.user_type == 'client') {
      Actions.client();
    }
  }
};
