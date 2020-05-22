import React, { Component } from 'react';
import { View, Text, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker }  from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AdMobInterstitial } from 'expo-ads-admob';
import { requestJobs, notesChanged, rideComplete } from '../actions/jobs_actions';
import { MARK_JOB_COMPLETE, JOB_PAGE_INSTRUCTIONS, CLIENT_NAME, RIDER_OLD_JOB_WARNING } from '../LanguageFile';
import i18n from "i18n-js";
import { Background, Logo, redColor, greenColor, yellowColor } from './MainStyleSheet';
import { CardSection, CButton } from './common';

class JobPage extends Component {

  state = {
    location: null,
    locationErrorMessage: null,
  };

  componentDidMount() {

    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      console.log("interstitialDidClose");
      this.completeJob();
     });
  }

  componentWillUnmount() {
     AdMobInterstitial.removeAllListeners();
  }

  onRedButtonPress() {
    this.showInterstitial();
  }

  completeJob() {
    const token = this.props.token;
    const job_id = this.props.jobDetail.jobDetail.id;
    this.getLocationAsync(token, job_id);
  }

  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }

  getLocationAsync = async (token, job_id) => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         errorMessage: 'Permission to access location was denied.',
       });
     }

     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
     const lat = location.coords.latitude;
     const long = location.coords.longitude;
     console.log('ending position');
     const { accountType } = this.props;
     this.props.rideComplete({ token, job_id, userType: accountType, rider_lat: lat, rider_long: long });
  };

  renderAlert(){
    if (this.props.oldJob) {
      return(
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>{RIDER_OLD_JOB_WARNING}</ Text>
        </View>
      );
    }
  }

  render() {
  const { backgroundImage } = styles;
  const jobDetail = this.props.jobDetail.jobDetail;
    if (jobDetail) {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
          <View style={{ flex:1, paddingLeft: 5, paddingRight: 5, paddingBottom:50 }}>
         
            <MapView
              style={{ marginBottom: 5, height: 275}}
              initialRegion={{
                latitude: jobDetail.latitude,
                longitude: jobDetail.longitude,
                latitudeDelta: 0.0125,
                longitudeDelta: 0.0081,
              }} 
              >
              <Marker
                coordinate={{ latitude: jobDetail.latitude, longitude: jobDetail.longitude }}
                image={require('../../assets/personMapMarker.png')}
              />
              <Marker
                coordinate={{ latitude: jobDetail.rider_lat, longitude: jobDetail.rider_long }}
                image={require('../../assets/logoMapMarker.png')}
              />
            </MapView>

            <CardSection style={styles.jobsDetailStyle}>
            <View style={styles.jobsDetailStyle}>
                <View style={{paddingBottom: 5, flexDirection: 'row'}}>
                <Text style={styles.textStyle}>{CLIENT_NAME} </Text>
                <Text style={styles.textStyleTwo}>{jobDetail.title}</Text>
                </View>
                <View>
                <Text style={styles.textStyle}>{JOB_PAGE_INSTRUCTIONS}</Text>
                <Text style={styles.textStyleTwo}>{jobDetail.note}</Text>
                </View>
            </View>
            </CardSection>
            <CardSection>
              {this.renderAlert()}
            </CardSection>
            <CardSection>
              <Text style={styles.textStyleTwo}>Once you have taken your client to the destination mark the job complete. The destination is used to calculate your stats.</Text>
            </CardSection>
            <CardSection>
              <CButton onPress={this.onRedButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t('job_complete') }} />
            </CardSection>
          </View>
        </ ImageBackground>
        );
    }

  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
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
  jobsDetailStyle: {
    flex: 1,
    paddingBottom: 20,
  },
  textStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  textStyleTwo: {
    fontSize: 15,
    color: 'white',
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

const mapStateToProps = (state) => {
 return {
  user: state.auth.user,
  token: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.error,
  accountType: state.auth.accountType,
  jobDetail: state.job.jobDetail,
  oldJob: state.job.oldJob,
  }
}

export default connect(mapStateToProps, { requestJobs, notesChanged, rideComplete })(JobPage);
