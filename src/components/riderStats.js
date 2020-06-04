import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker }  from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AdMobBanner } from "expo-ads-admob";
import { requestJobs, notesChanged, rideMethod, checkOutstandingJob } from '../actions/jobs_actions';
import { logOutUser, setLoading } from '../actions/index';
import JobListItem from './JobListItem';
import i18n from "i18n-js";
import { Background, TextStyles, greenColor } from './MainStyleSheet';
import { CardSection, CButton, Spinner } from './common';

class RiderStats extends Component {
  
  state = {
    location: null,
    locationErrorMessage: null,
    lat: null,
    long: null,
  };
  interval = 0;
  intervalTwo = 0;

  componentWillMount() {
    const { token } = this.props;
    this.props.checkOutstandingJob({ token, userType: 'rider' });
    this.props.setLoading(false);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
    
  };



  logOut() {
    this.props.logOutUser();
  }

   // send the lat, long and note off to the backend.
    sendJobRequest() {
      this.props.requestJobs({ lat, long, token, range});
     }

     onButtonPress() {
      this.logOut();
     }


  render() {

    return (
      <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
        <View style={{ flex:1, paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
          <CardSection>
            <CButton onPress={this.onButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('sign_out') }} />
          </CardSection>
          <CardSection>
            <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("no_jobs")}</Text>
          </CardSection>
          <Spinner />

        </View>
      </ ImageBackground>
      );
    }
}

const styles = {
  jobsListStyle: {
    flex: 1,
    backgroundColor: 'white'
  }
};

const mapStateToProps = (state) => {
  const { user, token, loading, error } = state.auth;
  const { jobsList, jobDetail, oldJob } = state.job;
 return { user, token, loading, error, jobsList, jobDetail, oldJob }
}

export default connect(mapStateToProps, { requestJobs, notesChanged, rideMethod, checkOutstandingJob, logOutUser, setLoading })(RiderStats);
