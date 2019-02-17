import { EMAIL_CHANGED, PASSWORD_CHANGED,
        LOGIN_USER, LOGIN_USER_SUCCESS,
        LOGIN_BLANK_ERROR, LOGIN_USER_FAIL,
        SELECT_MOTOR, SELECT_CLIENT, NAME_CHANGED,
        REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
email: 'test1@test.com',
password: '12345678',
token: '',
user: null,
token: '',
loading: false,
error: '',
accountType: '',
userName: '',
userMessage: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case NAME_CHANGED:
      return { ...state, userName: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_BLANK_ERROR:
      return { ...state, error: action.payload.error };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    case REGISTER_USER_FAIL:
        return { ...state, error: 'Email is already in use', password: '', loading: false };
    case LOGIN_USER:
      return { ...state, error: '', loading: true };
    case SELECT_MOTOR:
      return { ...state, accountType: 'rider' };
    case SELECT_CLIENT:
      return { ...state, accountType: 'client' };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        loading: action.payload.loading,
        accountType: action.payload.user_type,
        password: ''};
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, password: '', user: action.payload.user};
    default:
      return state;
  }
};
