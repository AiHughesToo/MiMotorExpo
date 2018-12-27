import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER,
         LOGIN_USER_SUCCESS, LOGIN_BLANK_ERROR,
         LOGIN_USER_FAIL, SELECT_MOTOR, SELECT_CLIENT,
         NAME_CHANGED, REGISTER_USER, REGISTER_USER_SUCCESS,
         REGISTER_USER_FAIL, CLIENT_READY,
         JOB_NOTE_CHANGED, JOB_REQUESTED_SUCCESS,
         CLIENT_CANCEL, JOB_LIST_SUCCESS, JOBS_NOTE_CHANGED,
         TAKE_JOB_SUCCESS, RIDE_COMPLETE } from './types';

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
// testing.
export const notesChanged = (text) => {
  return {
    type: JOBS_NOTE_CHANGED,
    payload: text
  };
};
// this post request creates a new job in the DB.
export const requestRide = ({ lat, long, token, jobNote }) => {
       console.log(lat, long, jobNote);
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
    payload: { jobId: response.id }});
  Keyboard.dismiss();

};

// this post request a list of jobs local to the range.
export const requestJobs = ({ lat, long, token, range }) => {
      console.log(lat, long);
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

// rider mark Complete
export const rideComplete = ({ token, job_id }) => {
    return (dispatch) => {
      fetch('https://memotor-dev.herokuapp.com/rider/complete/'+ job_id, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then(response => rideCompleteSuccess(dispatch, response));
    };
};

const rideCompleteSuccess = (dispatch, response) => {
  console.log(response);
  dispatch({
    type: RIDE_COMPLETE});

  if (response.rider_complete) {
    console.log(this.state);
    Actions.jobList();
  }
};

//take a job
export const rideMethod = ({token, job_id, lat, long}) => {
      console.log(token);
      console.log(job_id);
      console.log(lat);
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
  console.log(response);
  dispatch({
    type: TAKE_JOB_SUCCESS,
    payload: { jobDetail: response }});
    if (response.taken) {
      Actions.onJob();
    }
};
