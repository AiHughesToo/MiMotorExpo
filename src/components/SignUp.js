import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { selectMotor, registerUser, emailChanged, passwordChanged, nameChanged, vinChanged, plateChanged, bikeTypeChanged} from '../actions';
import { Card, CardSection, Input, Button, RedButton, Spinner, DividerLine } from './common';
import { PASSWORD_TEXT, NAME_TEXT, EMAIL_TEXT, LOGIN_TEXT, SIGN_UP_TEXT, VIN_NUM, VEHICLE_TYPE, PLATE_NUM } from '../LanguageFile.js'
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

  onVinChange(text) {
    this.props.vinChanged(text);
  }

  onPlateChange(text) {
    this.props.plateChanged(text);
  }

  onBikeTypeChange(text) {
    this.props.bikeTypeChanged(text);
  }

  onButtonPress() {
      const { email, password, accountType, name, vin, plate, bikeType } = this.props;
      this.props.registerUser({ email, password, accountType, name, vin, plate, bikeType });
  }

  renderError() {
    if (this.props.error) {
        return(
          <Text style={{alignSelf: 'center', color: '#f00f00', fontSize: 20}}>{this.props.error}</Text>
        );
    }
  }
 
  renderFields() {
    if (this.props.accountType == "rider") {
      return(
        <Card>
        <CardSection>
          <Input
            label={VIN_NUM}
            placeholder="VIN"
            onChangeText={this.onVinChange.bind(this)}
            value={this.props.vin}
          />
        </CardSection>

       <CardSection >
        <Input
          label={PLATE_NUM}
          placeholder="Plate"
          onChangeText={this.onPlateChange.bind(this)}
          value={this.props.plate}
        />
       </CardSection>

       <CardSection >
        <Input
          label={VEHICLE_TYPE}
          placeholder="Bike Type"
          onChangeText={this.onBikeTypeChange.bind(this)}
          value={this.props.bikeType}
        />
       </CardSection>
  
       </Card>
      );
    }
  }

  renderForm() {
    if (this.props.accountType) {
      return(
        <Card>
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
          </Card>

          {this.renderFields()}
          
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
    vin: state.auth.vin,
    plate: state.auth.plate,
    bikeType: state.auth.bikeType,
    name: state.auth.userName,
    password: state.auth.password,
    loading: state.auth.loading,
    error: state.auth.error
    };
  };

export default connect(mapStateToProps, { emailChanged, passwordChanged, registerUser, nameChanged, vinChanged, plateChanged, bikeTypeChanged }) (SignUp);
