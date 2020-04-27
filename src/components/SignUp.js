import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { selectMotor, registerUser, emailChanged, passwordChanged, nameChanged} from '../actions';
import { Card, CardSection, Input, Button, RedButton, Spinner, DividerLine } from './common';
import { PASSWORD_TEXT, NAME_TEXT, EMAIL_TEXT, LOGIN_TEXT, SIGN_UP_TEXT } from '../LanguageFile.js'
import SelectAccountBar from './SelectAccountBar'

class SignUp extends Component {
  onNameChange(text) {
  this.props.nameChanged(text);
  }
  
  onEmailChange(text) {
   this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password, accountType, name } = this.props;
      this.props.registerUser({ email, password, accountType, name });
  }

  renderError() {
    if (this.props.error) {
        return(
          <Text style={{alignSelf: 'center', color: '#f00f00', fontSize: 20}}>{this.props.error}</Text>
        );
      }
  }
  renderForm() {
    if (this.props.accountType) {
      return(
        <Card>
        <CardSection>
          <Input
            label={NAME_TEXT}
            placeholder="name"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.userName}
          />
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

          <CardSection>
            <Input
             label={PASSWORD_TEXT}
             placeholder={PASSWORD_TEXT}
             onChangeText={this.onPasswordChange.bind(this)}
             value={this.props.password}
            />
          </CardSection>
            {this.renderError()}
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return(
      <Button onPress={this.onButtonPress.bind(this)}>
       {SIGN_UP_TEXT}
      </Button>
    );

  }
  render() {
  // a bit of destructuring for the styles. this makes the variables available below.
  const { backgroundImage, sectionTitleTextStyle } = styles;
  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={backgroundImage}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        extraHeight={Platform.select({ android: 250 })}>
          <View style={{ marginBottom: 15 }}>
           <Text style={sectionTitleTextStyle}> Select Account Type </ Text>
           <SelectAccountBar />
           {this.renderForm()}
          </View>
      </KeyboardAwareScrollView>
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
  logoImage: {
    width: 100,
    height: 98
  },
  sectionTitleTextStyle: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
  };

  const mapStateToProps = state => {
   return {
    accountType: state.auth.accountType,
    email: state.auth.email,
    name: state.auth.userName,
    password: state.auth.password,
    loading: state.auth.loading,
    error: state.auth.error
    };
  };

export default connect(mapStateToProps, { emailChanged, passwordChanged, registerUser, nameChanged }) (SignUp);
