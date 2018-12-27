import React, { Component } from 'react';
import { Platform, FlatList, ScrollView, View, Text, Image, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { Constants, Location, Permissions, MapView } from 'expo';
import { requestJobs, notesChanged, rideComplete } from '../actions/jobs_actions';
import JobListItem from './JobListItem';
import { Card, CardSection, Button, RedButton, Spinner, DividerLine } from './common';

class JobPage extends Component {
  // we need some local state to set the location of the user.
  state = {
    location: null,
    locationErrorMessage: null,
  };

   onRedButtonPress() {
    const token = this.props.token;
    const job_id = this.props.jobDetail.jobDetail.id;
    this.props.rideComplete({ token, job_id });
   }

  render() {
// a bit of destructuring for the styles. this makes the variables available below.
  const { backgroundImage } = styles;
  const jobDetail = this.props.jobDetail.jobDetail;
    if (jobDetail) {
    console.log(jobDetail);
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
          <View style={{ flex:1, paddingLeft: 5, paddingRight: 5, paddingBottom:50 }}>
            <MapView
              style={{ flex: 1 }}
              region={{
              latitude: jobDetail.rider_lat,
              longitude: jobDetail.rider_long,
              latitudeDelta: 0.0212,
              longitudeDelta: 0.0131,
             }}>
              <MapView.Marker
                coordinate={{latitude: jobDetail.rider_lat, longitude: jobDetail.rider_long }}
                title={'You are here'}
                description={"hi"}
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
                <Text style={styles.textStyle}>Pasenger Name: </Text>
                <Text style={styles.textStyleTwo}>{jobDetail.title}</Text>
                </View>
                <View>
                <Text style={styles.textStyle}>Job Notes:</Text>
                <Text style={styles.textStyleTwo}>{jobDetail.note}</Text>
                </View>
            </View>
            </CardSection>
            <CardSection>
              <RedButton onPress={this.onRedButtonPress.bind(this)}>
                Mark Job Complete
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
  }
};

const mapStateToProps = (state) => {
 console.log('maping state');
 console.log(state.job.jobsList);
 return {
  user: state.auth.user,
  token: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.error,
  jobDetail: state.job.jobDetail,
  }
}

export default connect(mapStateToProps, { requestJobs, notesChanged, rideComplete })(JobPage);
