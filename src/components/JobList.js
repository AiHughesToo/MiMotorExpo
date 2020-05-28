import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker }  from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AdMobBanner } from "expo-ads-admob";
import { requestJobs, notesChanged, rideMethod, checkOutstandingJob } from '../actions/jobs_actions';
import { logOutUser } from '../actions/index';
import JobListItem from './JobListItem';
import i18n from "i18n-js";
import { Background, TextStyles, greenColor } from './MainStyleSheet';
import { CardSection, CButton, Spinner } from './common';

class JobList extends Component {
  
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
    this.getLocationAsync();
  }

  componentDidMount() {
   this.interval = setInterval(() => this.getLocationAsync(), 9000);
   this.intervalTwo = setInterval(() => this.logOut(), 10800000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalTwo);
  };

  clearIntervals() {
    clearInterval(this.interval);
    clearInterval(this.intervalTwo);
  }

  logOut() {
    this.props.logOutUser();
  }
  // get the Location information and send the request for list of local jobs.
   getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         errorMessage: 'Permission to access location was denied.',
       });
     }

     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
     this.setState({location});
     this.sendJobRequest();
   };

   // send the lat, long and note off to the backend.
    sendJobRequest() {
      if(!this.state.location.coords) {
        this.getLocationAsync();
      }
      lat = JSON.stringify(this.state.location.coords.latitude);
      long = JSON.stringify(this.state.location.coords.longitude);
      lat = parseFloat(lat, 10);
      long = parseFloat(long, 10);
      this.setState({lat, long})
      console.log(this.state.lat);
      range = 5
      const { token } = this.props;
      const { jobsList } = this.props.jobsList;
      this.props.requestJobs({ lat, long, token, range});
     }

     onButtonPress() {
      this.logOut();
     }

     renderRow({ item }) {
      item.rider_lat = this.state.location.coords.latitude;
      item.rider_long = this.state.location.coords.longitude;
      item.token = this.props.token;
       return (
         <JobListItem
          data={item}
         />
       );
     }

     renderMap() {
       if(!this.state.lat) {
         console.log("lat not set");
       } else {
         return (
           <MapView
              style={{ marginBottom: 5, height: 175}}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0125,
                longitudeDelta: 0.0081,
              }}  
              >
              <Marker
                coordinate={{ latitude: lat, longitude: long }}
                image={require('../../assets/logoMapMarker.png')}
              />
           </MapView>  
         )
       }
     }

  render() {
  const jobsList = this.props.jobsList
    if (jobsList.length) {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
          <View style={{ flex:1, paddingLeft: 5, paddingRight: 5, paddingBottom: 20 }}>
            <CardSection>
            </CardSection>
            <MapView
              style={{ marginBottom: 5, height: 275}}
              initialRegion={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0125,
                longitudeDelta: 0.0081,
              }}  
              >
              <Marker
                coordinate={{ latitude: lat, longitude: long }}
                image={require('../../assets/logoMapMarker.png')}
              />
            </MapView>  
            <ScrollView>
              <FlatList
                data={this.props.jobsList}
                keyExtractor={job => `${job.id}`}
                renderItem={this.renderRow.bind(this)}
              />
            </ScrollView>
            <CardSection>
            <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("job_instructions")}</Text>
            </CardSection>
            <CardSection>
              <CButton onPress={this.onButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('sign_out') }} />
            </CardSection>
          </View>
        </ ImageBackground>
        );
    }

  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
        {this.renderMap()}
        <CardSection>
          <CButton onPress={this.onButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('sign_out') }} />
        </CardSection>
        <CardSection>
          <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("no_jobs")}</Text>
        </CardSection>
        <Spinner />

      </View>
      <CardSection>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" 
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError} />
      </CardSection>
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

export default connect(mapStateToProps, { requestJobs, notesChanged, rideMethod, checkOutstandingJob, logOutUser })(JobList);
