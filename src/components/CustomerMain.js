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
import { logOutUser } from '../actions/index';
import { requestRide, clientReady, noteChanged, clientCancel, checkOutstandingJob, rideComplete, clientCheckJobStatus} from '../actions/jobs_actions';
import { CardSection, BannerAdSection, InputLarge, CButton, DividerLine, Spinner } from './common';
import { Background, Logo, TextStyles, redColor, yellowColor, greenColor, AlertBox } from "./MainStyleSheet";
import { AdMobBanner } from "expo-ads-admob";


class CustomerMain extends Component {
  state = {
    location: null,
    locationErrorMessage: null,
    adLoaded: false,
    readyPress: false,
    loading: false
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
  }
  
  componentWillUnmount() {
    if(this.adLoaded) {
      AdMobInterstitial.removeAllListeners();
    }
   
    clearInterval(this.interval);
  };

  showInterstitial = async () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-9886916161414347/1625349382'); // iOS id 
    AdMobInterstitial.addEventListener("interstitialDidClose", () => this.completeJob());
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", (event) => this.completeJob());
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
    this.setState({ adLoaded: true, readyPress: false});
  }

  onLogoutPress() {
    this.logOut();
   }

  logOut() {
    this.props.logOutUser();
  }

  // checks if the request for a ride has been taken by a driver and returns the info to update the user.
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
    this.setState({loading: true, readyPress: false});
   this.props.clientCancel();
  }; 
  
  //mark ride complete
  onRedButtonPress() {
    console.log(this.state.loading);
    this.setState({loading: true})
    console.log(this.state.loading);
    this.showInterstitial();
  };

  completeJob() {
    const token = this.props.token;
    const job_id = this.props.jobDetail.jobDetail.id;
    this.props.rideComplete({ token, job_id, userType: 'customer' });
    this.setState({loading: false, readyPress: false});
  }

  // this is a helper method that calls the action from the input
  onNoteChange(text) {
    this.props.noteChanged(text);
  };

  // get the Location information and send the request for a ride.
  getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied.',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    this.setState({ location: location, readyPress: true });

    this.sendRideRequest();
  };

 // handle the button to make the network call sending lat long and the token.
 onButtonPress() {
   this.setState({ readyPress: true });
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
   this.setState({loading: false});
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

  renderReadyButton() {
    if (this.state.readyPress) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('ready') }} />
    );
  }

  renderCompleteJobButton() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onRedButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t("ride_complete") }} /> 
    );
  }

  renderCancelJobButton() {
    let label = this.props.userStage == 3 ? "cancel" : "ride_complete";
    console.log(this.state.loading);

    if (this.state.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onRedButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t(label) }} />
    );
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
            maxLength={60}
          />
        </CardSection>
        <CardSection>
          {this.renderReadyButton()}
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
            {this.renderCancelJobButton()}
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
          <Text style={TextStyles.primaryLangStyleLrg}>{rider_name} {i18n.t("on_way")}</ Text>
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
            {this.renderCancelJobButton()}
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
        <CardSection style={{ marginBottom: 50}}>
         <CButton onPress={this.onYellowButtonPress.bind(this)} bgColor={yellowColor} text={{primary: i18n.t("ready") }} /> 
        </CardSection>
        <View style={Logo.adContainer}>
          <BannerAdSection>
            <AdMobBanner
              bannerSize="mediumRectangle"
              adUnitID="ca-app-pub-9886916161414347/7189162093" 
              onDidFailToReceiveAdWithError={this.bannerError} />
          </BannerAdSection>
        </View>
        <CardSection>
          <CButton onPress={this.onLogoutPress.bind(this)} bgColor={redColor} text={{primary: i18n.t('sign_out') }} />
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


export default connect(mapStateToProps, { requestRide, clientReady, noteChanged, clientCancel, checkOutstandingJob,  logOutUser, rideComplete, clientCheckJobStatus }) (CustomerMain);
