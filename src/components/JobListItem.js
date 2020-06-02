import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import { TakeButton } from './common';
import { rideMethod } from '../actions/jobs_actions'; 
import { setLoading } from '../actions/index';
import i18n from "i18n-js";
import { TextStyles } from './MainStyleSheet';

export class JobListItem extends Component {

  onButtonPress() {
    console.log(this.props);
    this.props.setLoading(true);
    this.props.rideMethod({ job_id: this.props.data.id, lat: this.props.data.rider_lat,
            long: this.props.data.rider_long, token: this.props.data.token });
  }

    render() {
        return (
            <TouchableHighlight underlayColor={'#EEEEEE'}>
                <View style={styles.container}>
                      <View style={styles.nameView}>
                          <View>
                          <Text style={TextStyles.primaryLangStyleSmlNoPad}>{this.props.data.title}</Text>
                          </View>
                          <View>
                          <Text style={TextStyles.primaryLangStyleSmlNoPad}>{this.props.data.note}</Text>
                          </View>
                      </View>
                      <View style={styles.buttonView}>
                      <TakeButton onPress={this.onButtonPress.bind(this)}>
                       {i18n.t("take_job")}
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
        borderWidth: 0.5,
        marginBottom: 2,
        borderColor: '#ccc',
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

export default connect(mapStateToProps, { rideMethod, setLoading })(JobListItem);
