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
import { CardSection, Button, Spinner } from './common';

class JobList extends Component {
  
  state = {
    location: null,
    locationErrorMessage: null,
    lat: null,
    long: null,
  };

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
  const { backgroundImage } = styles;
  const jobsList = this.props.jobsList
    if (jobsList.length) {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
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
            <Text style={styles.textStyle}>This list updates every 10 seconds. New jobs will appear and job taken by other rides will be removed. </Text>
            </CardSection>
            <CardSection>
              <Button onPress={this.onButtonPress.bind(this)}>
              Cerrar sesión
              </Button>
            </CardSection>
          </View>
        </ ImageBackground>
        );
    }

  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
        {this.renderMap()}
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
          Por favor espera
          </Button>
        </CardSection>
        <CardSection>
          <Text style={styles.textStyle}>Right now we are not seeing any jobs this list updates every 10 seconds. Remember you need signal for this list to update.</Text>
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
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  textStyle: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
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
