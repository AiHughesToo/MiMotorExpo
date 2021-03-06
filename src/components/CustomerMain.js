import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView from 'react-native-maps';
import { Marker }  from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AdMobInterstitial }from 'expo-ads-admob';
import i18n from "i18n-js";
import UserCard from './UserCard';
import AnimatedPill from './AnimatedPill';
import { requestRide, clientReady, noteChanged, clientCancel, checkOutstandingJob, rideComplete, clientCheckJobStatus} from '../actions/jobs_actions';
import { CardSection, InputLarge, CButton, DividerLine } from './common';
import { Background, TextStyles, redColor, yellowColor, greenColor, AlertBox } from "./MainStyleSheet";


class CustomerMain extends Component {
  state = {
    location: null,
    locationErrorMessage: null
  };
  
  interval= 0;

  // check for outstanding jobs and give the user a warning if is one.
  componentWillMount() {
    const { token } = this.props;
    this.props.checkOutstandingJob({ token, userType: 'client' });
  }
  
  // this runs every 8 seconds and checks if a rider has taken the ride request
  componentDidMount() {
    this.interval = setInterval(() => this.check_job_status(), 8000);
  
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      
      this.completeJob();
    });
  
  }
  
  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
    clearInterval(this.interval);
  };

  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  }

  check_job_status(){
    if (this.props.userStage === 3){
      const jobId = this.props.jobDetail.jobDetail.id;
      const { token } = this.props;
      this.props.clientCheckJobStatus({token, jobId});
    }
  };

  // the user is ready lets set the userStage to 2 on button press
  onYellowButtonPress() {
   this.props.clientReady();
  };

  // let the user cancel a ride request.
  onCancelButtonPress() {
   this.completeJob();
   this.props.clientCancel();
  }; 
  
  //mark ride complete
  onRedButtonPress() {
     this.showInterstitial();
  };

  completeJob() {
    const token = this.props.token;
    const job_id = this.props.jobDetail.jobDetail.id;
    this.props.rideComplete({ token, job_id, userType: 'customer' });
  }

  // this is a helper method that calls the action from the input
  onNoteChange(text) {
    this.props.noteChanged(text);
  };

  // get the Location information and send the request for a ride.
  getLocationAsync = async () => {
    console.log("im getting the location");
    
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied.',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ location });
    console.log(JSON.stringify(this.state.location.coords.latitude));
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

  // if there is an old request not marked complete then tell the user
  renderAlert(){
    if (this.props.oldJob) {
      return(
        <View style={AlertBox.alertBox}>
          <Text style={TextStyles.primaryAlertText}>{i18n.t("customer_old_job_warn")}</ Text>
        </View>
      );
    }
  }

  // use state. userReady to display the first step or the second.
  renderSection(){
  const { sectionView } = styles;
  // user is ready to request a ride. this is a 2 step process to avoid
  // accidental or butt ride requests.
    if(this.props.userStage == 2){
      return(
      <View style={sectionView}>
        <View>
          <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("ride_instructions")}</Text>
        </View>
        <CardSection>
          <InputLarge
            placeholder=" "
            onChangeText={this.onNoteChange.bind(this)}
            value={this.props.jobNote}
          />
        </CardSection>
        <CardSection>
          <CButton onPress={this.onButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('ready') }} />
        </CardSection>
        <View>
          <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("gps_warning")}</ Text>
        </View>
        <CardSection>
          <CButton onPress={this.onCancelButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t('cancel') }} />
        </CardSection>
      </View>
      );
    }
// the user has sent a ride request and is now waiting for someone
// to accept the job. The user can candel the job at this point.
    if(this.props.userStage == 3){
      return(
        <View>
          <View>
            <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("requested")}</ Text>
          </View>
          <View style={{height: 80, marginBottom: 40, marginLeft: 15, marginRight: 15}}>
            <AnimatedPill />
          </ View>
          <CardSection>
            <CButton onPress={this.onRedButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t("cancel") }} />
          </CardSection>
        </View>
      );
    }
// the ride request has been accepted and a rider is on his way
// we need to let the user know who is on the way to pick them up.
// the user can no longer cancel the job as someone has already commited.
    if(this.props.userStage == 4){
    const { rider_name, rider_lat,
            rider_long, latitude, longitude } = this.props.jobDetail.jobDetail;
      return(
        <View>
          <Text style={TextStyles.primaryLangStyleLrg}>{rider_name}{i18n.t("on_way")}</ Text>
          <MapView
            style={{ marginBottom: 5, height: 275}}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0125,
              longitudeDelta: 0.0081,
            }} >
              <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                image={require('../../assets/personMapMarker.png')}
              />
              <Marker
                coordinate={{ latitude: rider_lat, longitude: rider_long }}
                image={require('../../assets/logoMapMarker.png')}
              />
            </MapView>
          <CardSection>
            {this.renderAlert()}
          </CardSection>
          <CardSection>
            <CButton onPress={this.onRedButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t("ride_colmplete") }} />
          </CardSection>
        </View>
      );
    }

// the inital user screen if all the above didn't catch.
    return(
      <View>
        <View>
          <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("client_ready")}</ Text>
        </View>
        <CardSection>
         <CButton onPress={this.onYellowButtonPress.bind(this)} bgColor={yellowColor} text={{primary: i18n.t("ready") }} /> 
        </CardSection>
      </View>
    );
  }

  render() {
  const { backgroundImage } = styles;
  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 250 })}>
          <UserCard />
          <DividerLine />
            {this.renderSection()}
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>

    );
  }
}

const styles = {
  sectionView: {
    justifyContent: 'center',
  }
};

const mapStateToProps = state => {
  const { user, token, loading, error } = state.auth;
  const { userStage, jobNote, jobId, oldJob, jobDetail } = state.job;

return { user, token, loading, error, userStage, jobNote, jobId, oldJob, jobDetail };
};


export default connect(mapStateToProps, { requestRide, clientReady, noteChanged, clientCancel, checkOutstandingJob, rideComplete, clientCheckJobStatus }) (CustomerMain);
