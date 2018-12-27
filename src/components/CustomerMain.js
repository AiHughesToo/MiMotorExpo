import React, { Component } from 'react';
import { Platform, View, Text, Image, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { Constants, Location, Permissions } from 'expo';
import UserCard from './UserCard';
import AnimatedPill from './AnimatedPill';
import { requestRide, clientReady, noteChanged, clientCancel } from '../actions/jobs_actions';
import { Card, CardSection, InputLarge, Button, RedButton, YellowButton, Spinner, DividerLine } from './common';

class CustomerMain extends Component {
// we need some local state to set the location of the user.
state = {
  location: null,
  locationErrorMessage: null
};
// the user is ready lets set the userStage to 2 on button press
onYellowButtonPress() {
 this.props.clientReady();
}
// let the user cancel a ride request.
onCancelButtonPress() {
  console.log('the button was pressed and I called the action.');
 this.props.clientCancel();
}
// this is a helper method that calls the action from the input
onNoteChange(text) {
  this.props.noteChanged(text);
}

// get the Location information and send the request for a ride.
 getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       errorMessage: 'Permission to access location was denied.',
     });
   }

   let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
   this.setState({ location });
   this.sendRideRequest();
 };

// handle the button to make the network call sending lat long and the token.
 onButtonPress() {
  this.getLocationAsync();
 }
// send the lat, long and note off to the backend.
 sendRideRequest() {
   lat = JSON.stringify(this.state.location.coords.latitude);
   long = JSON.stringify(this.state.location.coords.longitude);
   lat = parseFloat(lat, 10);
   long = parseFloat(long, 10);
   const { token, jobNote } = this.props;
   this.props.requestRide({ lat, long, token, jobNote});
  }
// use state. userReady to display the first step or the second.
  renderSection(){
  const { textStyle, textStyle2, sectionView } = styles;
// user is ready to request a ride. this is a 2 step process to avoid
// accidental or butt ride requests.
    if(this.props.userStage == 2){
      return(
      <View style={sectionView}>
        <View>
          <Text style={textStyle}>Are you ready to request a ride?</ Text>
        </View>
        <CardSection>
          <InputLarge
            placeholder=" "
            onChangeText={this.onNoteChange.bind(this)}
            value={this.props.jobNote}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
           Lets Go
          </Button>
        </CardSection>
        <View>
          <Text style={textStyle2}>You must have GPS enabled to use this feature.
          Remember riders close to you can see your location on a map.</ Text>
        </View>
      </View>
      );
    }
// the user has sent a ride request and is now waiting for someone
// to accept the job. The user can candel the job at this point.
    if(this.props.userStage == 3){
      return(
        <View>
          <View>
            <Text style={textStyle}>Ride Requested</ Text>
          </View>
          <View style={{height: 80, marginBottom: 40, marginLeft: 15, marginRight: 15}}>
            <AnimatedPill />
          </ View>
          <CardSection>
            <RedButton onPress={this.onCancelButtonPress.bind(this)}>
             CANCEL
            </RedButton>
          </CardSection>
        </View>
      );
    }
// the ride request has been accepted and a rider is on his way
// we need to let the user know who is on the way to pick them up.
// the user can no longer cancel the job as someone has already commited.
    if(this.props.userStage == 4){
      return(
        <View>
          <Text style={textStyle}>Ride Requested</ Text>
        </View>
      );
    }
// the inital user screen if all the above didn't catch.
    return(
      <View>
        <View>
          <Text style={textStyle}>Are you ready to request a ride?</ Text>
        </View>
        <CardSection>
          <YellowButton onPress={this.onYellowButtonPress.bind(this)}>
           Ready
          </YellowButton>
        </CardSection>
      </View>
    );
  }

  render() {
  const { backgroundImage, textStyle } = styles;
  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
        <UserCard />
        <DividerLine />
          {this.renderSection()}
      </View>
    </ ImageBackground>

    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  sectionView: {
    justifyContent: 'center',
  },
  textStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  textStyle2: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10
  }
};
const mapStateToProps = state => {
 return {
  user: state.auth.user,
  token: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.error,
  userStage: state.job.userStage,
  jobNote: state.job.jobNote,
  jobId: state.job.jobId,
  };
};


export default connect(mapStateToProps, { requestRide, clientReady, noteChanged, clientCancel }) (CustomerMain);
