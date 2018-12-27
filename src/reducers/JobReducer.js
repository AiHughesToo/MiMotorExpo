import { EMAIL_CHANGED, PASSWORD_CHANGED,
        LOGIN_USER, LOGIN_USER_SUCCESS,
        LOGIN_BLANK_ERROR, LOGIN_USER_FAIL,
        SELECT_MOTOR, SELECT_CLIENT, NAME_CHANGED,
        REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
        CLIENT_READY, JOB_NOTE_CHANGED, JOB_REQUESTED_SUCCESS,
        CLIENT_CANCEL, JOB_LIST_SUCCESS, JOBS_NOTE_CHANGED,
        TAKE_JOB_SUCCESS, RIDE_COMPLETE } from '../actions/types';

const INITIAL_STATE = {
userStage: '',
jobNote: '',
jobId: '',
jobsList: [],
jobDetail: {},
customerMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case CLIENT_READY:
      return { ...state, userStage: 2 };
    case JOB_NOTE_CHANGED:
      return { ...state, jobNote: action.payload };
    case JOB_REQUESTED_SUCCESS:
      return { ...state, jobId: action.payload, userStage: 3 };
    case CLIENT_CANCEL:
      return { ...state, userStage: 1 };
    case JOB_LIST_SUCCESS:
      return { ...state, jobsList: action.payload.jobsList };
    case JOBS_NOTE_CHANGED:
      return { ...state, jobsNote: action.payload };
    case TAKE_JOB_SUCCESS:
      return { ...state, jobDetail: action.payload };
    case RIDE_COMPLETE:
      return { ...state, jobsList: [], jobDetail: {} };
    default:
      return state;
  }
};
