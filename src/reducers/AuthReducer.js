import { EMAIL_CHANGED, PASSWORD_CHANGED,
        LOGIN_USER, LOGIN_USER_SUCCESS,
        LOGIN_BLANK_ERROR, LOGIN_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
email: '',
password: '',
token: '',
user: null,
token: '',
loading: false,
error: '',
language: 'english'
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_BLANK_ERROR:
      return { ...state, error: action.payload.error };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    case LOGIN_USER:
      return { ...state, error: '', loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        token: action.payload.token,
        user: action.payload.user_type,
        loading: action.payload.loading,
        password: ''};
    default:
      return state;
  }
};
