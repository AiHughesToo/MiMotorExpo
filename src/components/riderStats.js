import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text, ImageBackground, Image} from 'react-native';
import { connect } from 'react-redux';
import { requestJobs, notesChanged, rideMethod, checkOutstandingJob } from '../actions/jobs_actions';
import { logOutUser, setLoading } from '../actions/index';
import i18n from "i18n-js";
import { Background, TextStyles, Logo, greenColor } from './MainStyleSheet';
import { CardSection, CButton } from './common';

class RiderStats extends Component {
  
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
    //this.props.checkOutstandingJob({ token, userType: 'rider' });
    this.props.setLoading(false);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
    
  };



  logOut() {
    this.props.logOutUser();
  }

   // send the lat, long and note off to the backend.
    sendJobRequest() {
      this.props.requestJobs({ lat, long, token, range});
     }

     onButtonPress() {
      this.logOut();
     }


  render() {
    const { email, userName } = this.props;

    return (
      <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
        <View style={{ flex:1, paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>
          <CardSection>
            <Image source={require('../../assets/temp_logo.png')} style={Logo.userImage} />
            <View style={{ flex:1 }}> 
            <CardSection>
              <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("email")}</Text>
              <Text style={TextStyles.primaryLangStyleSml}>: {email}</Text>
            </CardSection>
            <CardSection>
              <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("name")}</Text>
              <Text style={TextStyles.primaryLangStyleSml}>: {userName}</Text>
            </CardSection>
             
              
            </View>

          </CardSection>
          <CardSection>
            <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("email")}</Text>
          </CardSection>
        
        </View>
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
  const { userName, token, loading, error, email } = state.auth;
  const { jobsList, jobDetail, oldJob } = state.job;
 return { userName, token, loading, error, email, jobsList, jobDetail, oldJob }
}

export default connect(mapStateToProps, { requestJobs, notesChanged, rideMethod, checkOutstandingJob, logOutUser, setLoading })(RiderStats);
