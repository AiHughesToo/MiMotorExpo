import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER,
         LOGIN_USER_SUCCESS, LOGIN_BLANK_ERROR,
         LOGIN_USER_FAIL, SELECT_MOTOR, SELECT_CLIENT,
         NAME_CHANGED, REGISTER_USER, REGISTER_USER_SUCCESS,
         REGISTER_USER_FAIL, CLIENT_READY,
         JOB_NOTE_CHANGED, JOB_REQUESTED_SUCCESS,
         CLIENT_CANCEL, JOB_LIST_SUCCESS, JOBS_NOTE_CHANGED,
         TAKE_JOB_SUCCESS, RIDE_COMPLETE, HAS_OLD_JOB,
         CLIENT_HAS_OLD_JOB, CLIENT_HAS_OPEN_JOB, CLIENT_NOTIFY_OF_RIDER } from './types';

// action for client to set ready to request a ride.
export const clientReady = () => {
    return {
      type: CLIENT_READY
    };
};

// action for client to cancel a ride request.
export const clientCancel = () => {
    return {
      type: CLIENT_CANCEL
    };
};

// this is for the special instructions input on stage 2 of client request job form.
export const noteChanged = (text) => {
  return {
    type: JOB_NOTE_CHANGED,
    payload: text
  };
};

// this post request creates a new job in the DB.
export const requestRide = ({ lat, long, token, jobNote }) => {
  return (dispatch) => {
  // send the call to make the request for a job
    fetch('https://memotor-dev.herokuapp.com/make/job', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'latitude': lat, 'longitude': long, 'note': jobNote })
    })
    .then((response) => response.json())
    .then(response => requestRideSuccess(dispatch, response));
  };
};

const requestRideSuccess = (dispatch, response) => {
  dispatch({
    type: JOB_REQUESTED_SUCCESS,
    payload: { jobDetail: response }});
  Keyboard.dismiss();

};

// this post request a list of jobs local to the range.
export const requestJobs = ({ lat, long, token, range }) => {
    return (dispatch) => {
   // send the call to make the request for a job
       fetch('https://memotor-dev.herokuapp.com/rider_job_list', {
         method: 'POST',
         headers: {
           'Authorization': token,
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ 'rider_lat': lat, 'rider_long': long, 'range': range })
       })
       .then((response) => response.json())
       .then(response => requestJobsSuccess(dispatch, response));
     };
    };

     const requestJobsSuccess = (dispatch, response) => {
       dispatch({
         type: JOB_LIST_SUCCESS,
         payload: { jobsList: response }});
     };

// client mark Complete
export const rideComplete = ({ token, job_id, userType, rider_lat = 0.00, rider_long = 0.00 }) => {
  console.log("rider lat is: " + rider_lat);
    return (dispatch) => {
      fetch('https://memotor-dev.herokuapp.com/job/complete/'+ job_id, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'rider_lat': rider_lat, 'rider_long': rider_long })
      })
      .then((response) => response.json())
      .then(response => rideCompleteSuccess(dispatch, response, userType));
    };
};


const rideCompleteSuccess = (dispatch, response, userType) => {
  dispatch({
    type: RIDE_COMPLETE}); 
    console.log(response.rider_complete);
  if (userType === 'rider') {
      Actions.rider();
    }
};

//take a job
export const rideMethod = ({token, job_id, lat, long}) => {
    return (dispatch) => {
      fetch('https://memotor-dev.herokuapp.com/take/job/'+ job_id, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'rider_lat': lat, 'rider_long': long })
      })
      .then((response) => response.json())
      .then(response => takeJobSuccess(dispatch, response));
    };
};

const takeJobSuccess = (dispatch, response) => {
  dispatch({
    type: TAKE_JOB_SUCCESS,
    payload: { jobDetail: response }});
    console.log("take job success");
    console.log(response.taken);
    if (response.taken) {
      Actions.jobMap();
    }
};

export const checkOutstandingJob = ({ token, userType }) => {
  return (dispatch) => {

    fetch('https://memotor-dev.herokuapp.com/check_open/job', {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((response) => checkedJobs(dispatch, response, userType));
  };
};

const checkedJobs = (dispatch, response, userType) => {
  if (!response.message && response.id === undefined ){

  } else {
    if (!response.rider_complete && response.taken && userType === 'rider') {
      dispatch({
        type: HAS_OLD_JOB,
        payload: { jobDetail: response}});
        Actions.jobMap();
    } else if (!response.user_complete && userType === 'client') {
      console.log('user has an outstanding job.');
      if (response.taken) {
        dispatch({
          type: CLIENT_HAS_OLD_JOB,
          payload: { jobDetail: response}});
      } else {
        dispatch({
          type: CLIENT_HAS_OPEN_JOB,
          payload: { jobDetail: response}});
      }
    }
  }
};

// client checks for the rider to take the jobs
export const clientCheckJobStatus = ({token, jobId}) => {
  return (dispatch) => {
    fetch('https://memotor-dev.herokuapp.com/job/'+ jobId, {
      method: 'GET',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then(response => updateClientJobStatus(dispatch, response));
  };
};

const updateClientJobStatus = (dispatch, response) => {
  if (response.taken){
    console.log('job taken');
    dispatch({
      type: CLIENT_NOTIFY_OF_RIDER,
      payload: { jobDetail: response}});
  } else {
    console.log('job not taken', response);
  }
};
