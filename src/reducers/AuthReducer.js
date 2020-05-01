import { EMAIL_CHANGED, PASSWORD_CHANGED,
        LOGIN_USER, LOGIN_USER_SUCCESS,
        LOGIN_BLANK_ERROR, LOGIN_USER_FAIL,
        SELECT_MOTOR, SELECT_CLIENT, NAME_CHANGED,
        REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOG_OUT, VIN_CHANGED, PLATE_CHANGED, BIKETYPE_CHANGED } from '../actions/types';

const INITIAL_STATE = {
email: 'r@r.com',
password: '12345678',
vin: '',
plate: '',
bikeType: '',
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
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case NAME_CHANGED:
      return { ...state, userName: action.payload };
    case VIN_CHANGED:
      return { ...state, vin: action.payload };
    case PLATE_CHANGED:
      return { ...state, plate: action.payload };
    case BIKETYPE_CHANGED:
      return { ...state, bikeType: action.payload };
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
        user: action.payoad,
        token: action.payload.token,
        userName: action.payload.userName,
        loading: action.payload.loading,
        accountType: action.payload.user_type,
        password: ''};
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, password: '', user: action.payload.user};
    case LOG_OUT:
        return { INITIAL_STATE };
    default:
      return state;
  }
};
