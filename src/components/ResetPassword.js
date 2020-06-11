import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, requestPWToken, codeChanged, resetPW } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from 'i18n-js';
import { Background, TextStyles, yellowColor, greenColor } from './MainStyleSheet';
import { Card, CardSection, Input, CButton, DividerLine, Spinner } from './common';

class ResetPassword extends Component { 

  onCButtonPress() {
    const { email } = this.props;
    this.props.requestPWToken({ email });
  }

  onSubmitPasswordPress() {
    const { password, code } = this.props;
    this.props.resetPW({ password, code });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);   
  } 

  onCodeChange(text) {
    this.props.codeChanged(text);
  }

  renderRequestButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onCButtonPress.bind(this)} bgColor={yellowColor} text={{primary: i18n.t("request_token") }} />
    );
  }

  renderSetButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onSubmitPasswordPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t("forgot_pw")}} />
    );
  }

  renderSection() {
    if(this.props.requestSuccess){
      return (
        <Card>
          <CardSection>
            <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("check_email")}</Text>
          </CardSection>
          <CardSection>
            <Input
                label={i18n.t("code")}
                placeholder="CODE"
                keyboardType='email-address'
                onChangeText={this.onCodeChange.bind(this)}
                value={this.props.code}
            />
          </CardSection>
          
          <CardSection>
            <Input
              secureTextEntry
              label={i18n.t("pw")}
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          <DividerLine/>
          <CardSection>
            {this.renderSetButton()}
          </CardSection>
          </Card>
      );
    } else {
      
      return (
        <Card>
          <CardSection>
      <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("request_pw_par")}</Text>
          </CardSection>
          <CardSection>
            <Input
                label={i18n.t("email")}
                placeholder="email@gmail.com"
                keyboardType='email-address'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
            />
          </CardSection>

          <DividerLine/>

          <CardSection>
            {this.renderRequestButton()}
          </CardSection>
          </Card>
      );
    }
  }

  // render the page 
  render() {
    
    return (
      <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>

        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 250 })}>

          <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
          {this.renderSection()}
          </View>
        </KeyboardAwareScrollView>
      </ ImageBackground>
  
      );
    }
}

const mapStateToProps = state => {
  return {
   email: state.auth.email,
   password: state.auth.password,
   code: state.auth.resetCode,
   loading: state.auth.loading,
   error: state.auth.error,
   requestSuccess: state.auth.requestSuccess
   };
 };
 // use this to connect the action to the component. it gives us this.props. in the component
 export default  connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, requestPWToken, codeChanged, resetPW }) (ResetPassword);