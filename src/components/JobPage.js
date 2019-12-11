import React, { Component } from 'react';
import { View, Text, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { AdMobInterstitial } from 'expo-ads-admob';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { requestJobs, notesChanged, rideComplete } from '../actions/jobs_actions';
import { MARK_JOB_COMPLETE, JOB_PAGE_INSTRUCTIONS, CLIENT_NAME, RIDER_OLD_JOB_WARNING } from '../LanguageFile';
import { styles } from './styles/styles';
import { CardSection, RedButton } from './common';

class JobPage extends Component {

  state = {
    location: null,
    locationErrorMessage: null,
  };

  componentDidMount() {
    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>{
      console.log("interstitialDidFailToLoad")
      this.completeJob();
    }
    );
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      console.log("interstitialDidClose");
      console.log('**************************************');
      this.completeJob();
    }
      
    );
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      console.log("interstitialWillLeaveApplication")
    );
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
     console.log('ending position');
     const { accountType } = this.props;
     this.props.rideComplete({ token, job_id, userType: accountType });
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
  const { backgroundImage, textStyle, textStyleTwo } = styles;
  const jobDetail = this.props.jobDetail.jobDetail;
    if (jobDetail) {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
          <View style={{ flex:1, paddingLeft: 5, paddingRight: 5, paddingBottom:50 }}>
            <MapView
              style={{ flex: 1 }}
              region={{
              latitude: jobDetail.rider_lat,
              longitude: jobDetail.rider_long,
              latitudeDelta: 0.0312,
              longitudeDelta: 0.0231,
             }}>
              <MapView.Marker
                coordinate={{latitude: jobDetail.rider_lat, longitude: jobDetail.rider_long }}
                title={'Tu es aqui'}
                description={"Hola"}
                image={require('../../assets/logoMapMarker.png')}
              />
              <MapView.Marker
                coordinate={{latitude: jobDetail.latitude, longitude: jobDetail.longitude }}
                title={jobDetail.title}
                description={jobDetail.note}
                image={require('../../assets/personMapMarker.png')}
              />

            </MapView>
            <CardSection style={styles.jobsDetailStyle}>
            <View style={styles.jobsDetailStyle}>
                <View style={{paddingBottom: 5, flexDirection: 'row'}}>
                <Text style={textStyle}>{CLIENT_NAME} </Text>
                <Text style={textStyleTwo}>{jobDetail.title}</Text>
                </View>
                <View>
                <Text style={textStyle}>{JOB_PAGE_INSTRUCTIONS}</Text>
                <Text style={textStyleTwo}>{jobDetail.note}</Text>
                </View>
            </View>
            </CardSection>
            <CardSection>
              {this.renderAlert()}
            </CardSection>
            <CardSection>
              <RedButton onPress={this.onRedButtonPress.bind(this)}>
                {MARK_JOB_COMPLETE}
              </RedButton>
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
