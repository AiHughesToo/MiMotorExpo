import React, { Component } from 'react';
import { Platform, View, Text, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, BannerAdSection, Input, Button, RedButton, Spinner, DividerLine } from './common';
import { PASSWORD_TEXT, EMAIL_TEXT, LOGIN_TEXT, FORGOT_PASSWORD_TEXT, SIGN_UP_TEXT } from '../LanguageFile.js'
import { AdMobBanner } from "expo-ads-admob";

class LoginForm extends Component {
// this is a helper method that calls the action from the input
  onEmailChange(text) {
  this.props.emailChanged(text);
  }
// this helper method calls the action and keeps the state and value of the Input
// updated as you type.
  onPasswordChange(text) {
  this.props.passwordChanged(text);   
  } 

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  } 
  
  onRedButtonPress() {
    Actions.signUp();
  }

  onResetLinkPress() {
    Actions.resetPassword();
  }

  bannerError() {
    console.log("An error");
    return;
  }
// we need to show the user that we are waiting on the network request
// render button looks at loading piece of state and shows a spinner if loading is true.
// else it returns the login button.
  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return(
      <Button onPress={this.onButtonPress.bind(this)}>
       {LOGIN_TEXT}
      </Button>
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
  const { logoContainer, forgotPassStyle, logoImage, divLine } = styles;
  return (
  <ImageBackground source={require('../../assets/main_background.png')} style={styles.backgroundImage}>
    <View style={{ flex:1, paddingLeft: 5, paddingRight: 5 }}>

    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      keyboardOpeningTime={0}
      extraHeight={Platform.select({ android: 250 })}>

    <View style={logoContainer}>
        <Image source={require('../../assets/temp_logo.png')} style={styles.logoImage} />
      </View>
      <Card>
        <CardSection>
          <Input
            label={EMAIL_TEXT}
            placeholder="email@gmail.com"
            keyboardType='email-address'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
           secureTextEntry
           label={PASSWORD_TEXT}
           placeholder="password"
           onChangeText={this.onPasswordChange.bind(this)}
           value={this.props.password}
          />
        </CardSection>
          {this.renderError()}
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <View>
          <Text style={forgotPassStyle} onPress={this.onResetLinkPress.bind(this)}> {FORGOT_PASSWORD_TEXT} </Text>
        </View>
        <DividerLine />
        <CardSection>
        <RedButton onPress={this.onRedButtonPress.bind(this)}>
          {SIGN_UP_TEXT}
        </RedButton>
        </CardSection>
      </Card>
      </KeyboardAwareScrollView>
      <BannerAdSection>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" 
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError} />
      </BannerAdSection>
      
    </View>
  </ ImageBackground>

    );
  }
}

const styles = {
  logoContainer: {
    paddingTop: 25,
    paddingBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  forgotPassStyle: {
    color: '#fff',
    alignSelf: 'center',
    paddingTop: 10,
    fontSize: 17
  },
  logoImage: {
    width: 100,
    height: 98
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
};
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
