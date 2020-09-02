import React, { Component } from 'react';
import { Platform, View, Text, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import i18n from 'i18n-js';
import { Card, CardSection, BannerAdSection, Input, Spinner, DividerLine, CButton } from './common';
import { Background, TextStyles, Logo, redColor, greenColor, yellowColor } from './MainStyleSheet';
import { AdMobBanner } from "expo-ads-admob";

class LoginForm extends Component {

  onEmailChange(text) {
  this.props.emailChanged(text);
  }

  onPasswordChange(text) {
  this.props.passwordChanged(text);   
  } 

  onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password }); 
  } 
  
  onRegisterButtonPress() {
    Actions.signUp();
  }

  onResetLinkPress() {
    Actions.resetPassword();
  }

  bannerError() {
    console.log("An error");
    return;
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onLoginButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('login') }} />
    );
  }

  renderError() {
    if (this.props.error) {
      return(
        <Text style={{alignSelf: 'center', color: '#f00f00', fontSize: 20}}>{this.props.error}</Text>
      );
    }
  }

  render() {

  return (
  <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
    <View style={{ flex:1, paddingLeft: 5, paddingRight: 5 }}>

    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      extraHeight={Platform.select({ android: 250 })}>

      <View style={Logo.logoContainer}>
        <Image source={require('../../assets/temp_logo.png')} style={Logo.logoImage} /> 
      </View>
      <Card>
        <CardSection>
          <Input
            label={i18n.t('email')}
            placeholder="email@gmail.com"
            keyboardType='email-address'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
           secureTextEntry
           label={i18n.t('pw')}
           placeholder="password"
           onChangeText={this.onPasswordChange.bind(this)}
           value={this.props.password}
          />
        </CardSection>

          {this.renderError()}
        <CardSection>
          {this.renderLoginButton()}
        </CardSection>
        <DividerLine />
        <CardSection>
          <CButton onPress={this.onResetLinkPress.bind(this)} bgColor={yellowColor} text={{primary: i18n.t('forgot_pw') }} />
        </CardSection>
        <DividerLine />
        <CardSection>
          <CButton onPress={this.onRegisterButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t('register') }} />  
        </CardSection>
        <Text style={TextStyles.verySmlNoPad}>{i18n.t("ad_support")}</Text>
      </Card>
      <View style={Logo.adContainer}>
      <BannerAdSection>
        <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID="ca-app-pub-9886916161414347/3533661226" 
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError} />
      </BannerAdSection>
      </View>
      </KeyboardAwareScrollView>
     
     
    </View>
  </ ImageBackground>

    );
  }
}


// maping the state to the properties of this component.
const mapStateToProps = state => {
 return {
  email: state.auth.email,
  password: state.auth.password,
  name: state.auth.userName,
  loading: state.auth.loading,
  error: state.auth.error
  };
};
// use this to connect the action to the component. it gives us this.props. in the component
export default  connect(mapStateToProps, { emailChanged, passwordChanged, loginUser }) (LoginForm);
