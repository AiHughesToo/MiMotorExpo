import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableHighlightBase} from 'react-native';
import { connect } from 'react-redux';
import { setLoading, checkMyStats } from '../actions/index';
import i18n from "i18n-js";
import { Background, TextStyles, Logo, Award } from './MainStyleSheet';
import { CardSection, Spinner, DividerLine } from './common';

class RiderStats extends Component {
  
  state = {
    location: null,
    locationErrorMessage: null,
    lat: null,
    long: null,
  };

  componentWillMount() {
    const { token } = this.props;
    this.props.checkMyStats({ token });
    this.props.setLoading(false); 
  }

  componentDidMount() {
    // this.props.life_t_num_jobs >> 0 ? '../../assets/temp_logo.png': '../../assets/locked_award.png';
    if (this.props.life_t_num_jobs >> 0) this.first_ride = '../../assets/temp_logo.png';
  }


  render() {
    const { email, userName } = this.props;
    let image_source = '../../assets/locked_award.png'

    if(this.props.life_t_distance) {
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

            <DividerLine />

            <View>
             <Text style={TextStyles.primaryLangStyleLrgNoPad}>{i18n.t("life_time_dist")}:</Text>
             <Text style={TextStyles.primaryLangStyleSmlNoPad}>{this.props.life_t_distance.toFixed(2)}km / {(this.props.life_t_distance/1.609).toFixed(2)}mi</Text>
            </View>
            <View>
              <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("num_jobs")}: </Text>
              <Text style={TextStyles.primaryLangStyleSmlNoPad}>{this.props.life_t_num_jobs}</Text>
            </View>

            <DividerLine />

            <ScrollView> 

              <CardSection>
                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 0 ? require('../../assets/firstRide.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("first_r")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/tenthRide.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("10")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/hundred.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("100")}</Text>
                </View>

              </CardSection>

              <CardSection>
                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/f_mile.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("first_k")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/nts.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("nts")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/etw.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("etw")}</Text>
                </View>

              </CardSection>

              <CardSection>
                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/five_hun.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("500")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/thousand.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("1000")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                 <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/fivek.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("5000")}</Text>
                </View>

              </CardSection>

              <CardSection>
                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/oa.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("rdo")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/oncea.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("oa")}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Image source={
                    this.props.life_t_num_jobs > 10 ? require('../../assets/moon.png') : require('../../assets/locked_award.png')
                    } style={Award.container} />  
                  <Text style={TextStyles.primaryLangStyleSmlNoPad}>{i18n.t("moon")}</Text>
                </View>

              </CardSection>

            </ScrollView>
          
          </View>
        </ ImageBackground>
        );
    } else {
      return (
        <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
         <Spinner />
        </ImageBackground>
      );
    }
    
   }
}

const mapStateToProps = (state) => {
  const { userName, token, loading, error, email, life_t_distance, life_t_num_jobs } = state.auth;
  const { jobsList, jobDetail, oldJob } = state.job;
 return { userName, token, loading, error, email, jobsList, jobDetail, oldJob, life_t_distance, life_t_num_jobs }
}

export default connect(mapStateToProps, { setLoading, checkMyStats })(RiderStats);
