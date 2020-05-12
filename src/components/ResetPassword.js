import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, requestPWToken } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AnimatedPill from './AnimatedPill';
import { READY, E_READY,  PASSWORD_TEXT, EMAIL_TEXT } from '../LanguageFile';
import { Background, TextStyles } from './MainStyleSheet';
import { Card, CardSection, InputLarge, Input, CButton, DividerLine } from './common';

class ResetPassword extends Component { 

  // some state will be needed here

  onCButtonPress() {
    const { email } = this.props;
    this.props.requestPWToken({ email });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);   
  } 

  renderSection() {
    if(this.props.requestSuccess){
      return (
        <CardSection>
            <CButton onPress={this.onCButtonPress.bind(this)} bgColor='#f8cd81' text={{primary: READY, secondary: E_READY }} />
          </CardSection>
      );
    } else {
      return (
        <Card>
          <CardSection>
            <Text style={TextStyles.primaryLangStyleLrg}>If you have forgotten your password enter your email address and press the button below. An email with a password reset token will be sent to you.</Text>
          </CardSection>
          <CardSection>
            <Input
                label={EMAIL_TEXT}
                placeholder="email@gmail.com"
                keyboardType='email-address'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
            />
          </CardSection>

          <DividerLine/>

          <CardSection>
            <CButton onPress={this.onCButtonPress.bind(this)} bgColor='#f8cd81' text={{primary: READY, secondary: E_READY }} />
          </CardSection>
          </Card>
      );
    }
  }

  // render the page 
  render() {
    
    return (
      <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
        <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
        {this.renderSection()}
        </View>
      </ ImageBackground>
  
      );
    }
}

const mapStateToProps = state => {
  return {
   email: state.auth.email,
   password: state.auth.password,
   loading: state.auth.loading,
   error: state.auth.error,
   requestSuccess: state.auth.requestSuccess
   };
 };
 // use this to connect the action to the component. it gives us this.props. in the component
 export default  connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, requestPWToken}) (ResetPassword);