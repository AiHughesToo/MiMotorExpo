import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import { Card, CardSection, TakeButton, RedButton, Spinner, DividerLine } from './common';
import { takeJob, rideMethod } from '../actions/jobs_actions';
import { TAKE_JOB } from '../LanguageFile';
import { Location } from 'expo';

export class JobListItem extends Component {

  onButtonPress() {
    console.log(this.props);
    this.props.rideMethod({ job_id: this.props.data.id, lat: this.props.data.rider_lat,
            long: this.props.data.rider_long, token: this.props.data.token });
  }

    render() {
        return (
            <TouchableHighlight underlayColor={'#EEEEEE'}>
                <View style={styles.container}>
                      <View style={styles.nameView}>
                          <View>
                          <Text style={styles.nameText}>{this.props.data.title}</Text>
                          </View>
                          <View>
                          <Text style={styles.nameText}>{this.props.data.note}</Text>
                          </View>
                      </View>
                      <View style={styles.buttonView}>
                      <TakeButton onPress={this.onButtonPress.bind(this)}>
                       {TAKE_JOB}
                      </TakeButton>
                      </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderWidth: 0.3,
        marginBottom: 2,
        borderColor: '#ccc',
    },
    title: {
        color: '#fff',
        fontSize: 18
    },
    nameText: {
      color: '#fff',
      fontSize: 18
    },
    nameView: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingLeft: 5,
      flex: 1,
    },
    buttonView: {
      justifyContent: 'center',
      alignItems: 'center',
    }
});

const mapStateToProps = (state) => {
 return {
  user: state.auth.user,
  token: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.error,
  jobsList: state.job.jobsList,
  jobDetail: state.job.jobDetail,
  }
}

export default connect(mapStateToProps, { rideMethod })(JobListItem);
