import React, { Component } from 'react';
import { Platform, View, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from "i18n-js";
import { registerUser, emailChanged, passwordChanged, nameChanged, vinChanged, plateChanged, bikeTypeChanged} from '../actions';
import { Card, CardSection, Input, Spinner, CButton} from './common';
import { Background, TextStyles, greenColor, redColor } from './MainStyleSheet';
import { Actions } from 'react-native-router-flux';
import SelectAccountBar from './SelectAccountBar';

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

  onBackButtonPress() {
    Actions.login()
  }

  renderError() {
    if (this.props.error) {
        return(
          <Text style={{alignSelf: 'center', color: '#f00f00', fontSize: 20}}>{this.props.error}</Text>
        );
    }
  }

  renderBackButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return(
      <CButton onPress={this.onBackButtonPress.bind(this)} bgColor={redColor} text={{primary: i18n.t("cancel")}} />
    );
  }
 
  renderFields() {
    if (this.props.accountType == "rider") {
      return(
        <Card>
        <CardSection>
          <Input
            label={i18n.t('vin')}
            placeholder={i18n.t('vin')}
            onChangeText={this.onVinChange.bind(this)}
            value={this.props.vin}
          />
        </CardSection>

       <CardSection >
        <Input
          label={i18n.t('plate')}
          placeholder={i18n.t('plate')}
          onChangeText={this.onPlateChange.bind(this)}
          value={this.props.plate}
        />
       </CardSection>

       <CardSection >
        <Input
          label={i18n.t('bike_type')}
          placeholder={i18n.t('bike_type')}
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
            label={i18n.t('name')}
            placeholder={i18n.t('name')}
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.userName}
          />
        </CardSection>

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
             label={i18n.t('pw')}
             placeholder={i18n.t('pw')}
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
      <CButton onPress={this.onButtonPress.bind(this)} bgColor={greenColor} text={{primary: i18n.t('register') }} />  
    );

  }
  
  render() {
  
  return (
    <ImageBackground source={require('../../assets/main_background.png')} style={Background.backgroundImage}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        keyboardOpeningTime={0}
        extraHeight={Platform.select({ android: 250 })}>
          <View style={{ marginBottom: 15 }}>
           <Text style={TextStyles.primaryLangStyleSml}>{i18n.t("account_typ_select")} </ Text>
           <SelectAccountBar />
           {this.renderForm()}
           <CardSection>
            {this.renderBackButton()}
          </CardSection>
          </View>
      </KeyboardAwareScrollView>
    </ ImageBackground>

    );
  }
  }

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
