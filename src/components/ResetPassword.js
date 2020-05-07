import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserCard from './UserCard';
import AnimatedPill from './AnimatedPill';
import { GPS_WARNING_CLIENT, E_GPS_WARNING_CLIENT, CLIENT_READY,
        E_CLIENT_READY, E_RIDE_INSTRUCTIONS, RIDE_INSTRUCTIONS,
        READY, E_READY, E_CANCEL, CANCEL, IS_ON_THE_WAY, E_IS_ON_THE_WAY} from '../LanguageFile';
import { requestRide, clientReady, noteChanged, clientCancel, checkOutstandingJob, rideComplete, clientCheckJobStatus} from '../actions/jobs_actions';
import { CardSection, InputLarge, Button, RedButton, YellowButton, DividerLine } from './common';

class ResetPassword extends Component { 

  // some state will be needed here

  onYellowButtonPress() {
    Actions.auth();
  }

  // render the page 
  render() {
    const { backgroundImage } = styles;
    
    return (
      <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
        <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
          <CardSection>
          <YellowButton onPress={this.onYellowButtonPress.bind(this)}>
           { READY }/{ E_READY }
          </YellowButton>
          </CardSection>
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
  mainLangStyleLrg: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  mainLangStyleSml: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 8
  },
  englishLangStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 2,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  alertBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f8cd81',
    borderRadius: 5,
    padding: 5,
    flex: 1,
  },
  alertText: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
  }
};

const mapStateToProps = state => {
  return {
   email: state.auth.email,
   password: state.auth.password,
   name: state.auth.userName,
   loading: state.auth.loading,
   error: state.auth.error
   };
 };
 // use this to connect the action to the component. it gives us this.props. in the component
 export default  connect(mapStateToProps, { emailChanged, passwordChanged, loginUser }) (ResetPassword);