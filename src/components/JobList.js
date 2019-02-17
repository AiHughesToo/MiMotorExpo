import React, { Component } from 'react';
import { Platform, FlatList, ScrollView, View, Text, Image, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { Constants, Location, Permissions, MapView } from 'expo';
import { requestJobs, notesChanged, rideMethod, checkOutstandingJob } from '../actions/jobs_actions';
import JobListItem from './JobListItem';
import { Card, CardSection, Button, RedButton, Spinner, DividerLine } from './common';

class JobList extends Component {
  // we need some local state to set the location of the user.
  state = {
    location: null,
    locationErrorMessage: null,
  };

  componentWillMount() {
    const { token } = this.props;
    this.props.checkOutstandingJob({ token, userType: 'rider' });
    this.getLocationAsync();
  }

  componentDidMount() {
   this.interval = setInterval(() => this.getLocationAsync(), 9000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }; 

  // get the Location information and send the request for list of local jobs.
   getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         errorMessage: 'Permission to access location was denied.',
       });
     }

     let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
     this.setState({ location});
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
      range = 5
      const { token } = this.props;
      const { jobsList } = this.props.jobsList;
      this.props.requestJobs({ lat, long, token, range});

      //setTimeout(() => this.con_log(), 5000);
     }

     onButtonPress() {
      this.getLocationAsync();
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

  render() {
// a bit of destructuring for the styles. this makes the variables available below.
  const { backgroundImage } = styles;
  const jobsList = this.props.jobsList
    if (jobsList.length) {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
          <View style={{ flex:1, paddingLeft: 5, paddingRight: 5, paddingBottom: 20 }}>
            <CardSection>
            </CardSection>
            <MapView
              style={{ marginBottom: 5, height: 175}}
              region={{
              latitude: this.state.location.coords.latitude,
              longitude: long,
              latitudeDelta: 0.0162,
              longitudeDelta: 0.0081,
             }}>
              <MapView.Marker
                coordinate={{latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude }}
                title={'You are here'}
                description={"hi"}
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
              <Button onPress={this.onButtonPress.bind(this)}>
               Refresh Job List
              </Button>
            </CardSection>
          </View>
        </ ImageBackground>
        );
    }

  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
      <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
           Please Wait
          </Button>
        </CardSection>
        <Spinner />

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

export default connect(mapStateToProps, { requestJobs, notesChanged, rideMethod, checkOutstandingJob })(JobList);
