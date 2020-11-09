import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker }  from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AdMobInterstitial } from 'expo-ads-admob';
import { requestJobs, rideComplete } from '../actions/jobs_actions';
import { setLoading } from '../actions/index';
import i18n from "i18n-js";
import { Background, TextStyles, redColor } from './MainStyleSheet';
import { CardSection, CButton, Spinner } from './common';

class JobPage extends Component {


  state = {
    location: {},
    locationErrorMessage: null,
    loading: false,
    counter: 0,
    
  };

  interval = 0;

  componentDidMount() {
    
    this.interval = setInterval(() => this.getLocationAsync(), 1000);
     
     AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      this.completeJob();
     });
  }

  componentWillUnmount() {
    clearInterval(this.interval);

    this._isMounted = false;

    if (AdMobInterstitial.getIsReadyAsync()) {
      console.log('There is an add and its ready');
      AdMobInterstitial.removeAllListeners();
    }
  }

  onExit() {
    console.log('This is on exit');
  }

  onRedButtonPress() {
    this.setState({loading: true});
    this.showInterstitial(); 
  }

  showInterstitial = async () => {
    
      AdMobInterstitial.setAdUnitID('ca-app-pub-9886916161414347/4930503371'); // iOS id
     // AdMobInterstitial.addEventListener("interstitialDidClose", () => {this.completeJob();});
      AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => this.completeJob());
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
      this.setState({loading: false});
    
  }

  completeJob() {
    
      const token = this.props.token;
      const job_id = this.props.jobDetail.jobDetail.id;
      this.getLocationAsync();
      const lat = this.state.location.coords.latitude;
      const long = this.state.location.coords.longitude;
      this.props.setLoading({loadingState: false });
      const { accountType } = this.props;
      this.props.rideComplete({ token, job_id, userType: accountType, rider_lat: lat, rider_long: long });
    
  }

  getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied.',
        });
      }
 
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      this.setState({location});
    
  };

  // sendCompleteJobCall(token, job_id) {
  //    const lat = this.state.location.coords.latitude;
  //    const long = this.state.location.coords.longitude;
  //    const { accountType } = this.props;
  //    this.props.rideComplete({ token, job_id, userType: accountType, rider_lat: lat, rider_long: long });
  // }

  renderAlert(){
    if (this.props.oldJob) {
      return(
        <View style={styles.alertBox}>
          <Text style={TextStyles.primaryAlertText}>{i18n.t("rider_old_job_alert")}</ Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onRedButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t('job_complete') }} /> 
    );

  }

  renderMap(jobDetail) {
     let rider_lat  = jobDetail.rider_lat;
     let rider_long = jobDetail.rider_long;

    if(Object.keys(this.state.location).length >> 0) {
      rider_lat = this.state.location.coords.latitude;
      rider_long = this.state.location.coords.longitude;
    } 
      return (
        <MapView
        style={{ marginBottom: 4, height: 255, borderRadius: 10 }}
        initialRegion={{
          latitude: jobDetail.latitude,
          longitude: jobDetail.longitude,
          latitudeDelta: 0.0225,
          longitudeDelta: 0.0099,
        }} 
        >
        <Marker
          coordinate={{ latitude: jobDetail.latitude, longitude: jobDetail.longitude }}
          image={require('../../assets/personMapMarker.png')}
        />
        <Marker
          coordinate={{ latitude: rider_lat, longitude: rider_long }}
          image={require('../../assets/logoMapMarker.png')}
        />
      </MapView>
      )
    
  }

  render() {
  const jobDetail = this.props.jobDetail.jobDetail;
    if (jobDetail) {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
          <View style={{ flex:1, paddingLeft: 5, paddingRight: 5, paddingBottom:50 }}>
              {this.renderMap(jobDetail)}

            <CardSection style={styles.jobsDetailStyle}>
            <View style={styles.jobsDetailStyle}>
              <View style={{paddingBottom: 4, flexDirection: 'row'}}>
                <Text style={TextStyles.SmlNoPad}>{i18n.t("go_to_client")} </Text>
              </View>
              <View style={{paddingBottom: 4, flexDirection: 'row'}}>
                <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("client_name")} </Text>
                <Text style={TextStyles.primaryLangStyleSml}>{jobDetail.title}</Text>
              </View>
              <View style={{flex: 1, minHeight:50}}>
                <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("instructions")}</Text>
                <Text style={TextStyles.primaryLangStyleLrg}>{jobDetail.note}</Text>
              </View>
            </View>
            </CardSection>
            <CardSection>
              {this.renderAlert()}
            </CardSection>
            <CardSection>
            <Text style={TextStyles.SmlNoPad}>{i18n.t("mark_ride_comp_inst")}</Text>
            </CardSection>
            <CardSection>
              {this.renderButton()}
            </CardSection>
          </View>
        </ ImageBackground>
        );
    }

  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
      </View>
    </ ImageBackground>
    );
  }
}

const styles = {
  jobsDetailStyle: {
    flex: 1,
    paddingBottom: 20,
  },
  alertBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f8cd81',
    borderRadius: 5,
    padding: 5,
    flex: 1,
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

export default connect(mapStateToProps, { requestJobs, rideComplete, setLoading })(JobPage);
