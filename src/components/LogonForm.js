import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import DisplayState from './DisplayState';
import { Card, CardSection, Input, Button, RedButton, Spinner } from './common';

class LoginForm extends Component {
// this is a helper method that calls the action from the imput
  onEmailChange(text) {
  this.props.emailChanged(text);
  }

  onPasswordChange(text) {
  this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  onRedButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='small' />;
    }

    return(
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );

  }

  render() {
const { logoContainer, forgotPassStyle, logoImage, divLine } = styles;
    return (
    <View style={{ flex:1, paddingLeft: 15, paddingRight: 15 }}>
      <View style={logoContainer}>
      <Image source={require('../../assets/temp_logo.png')} style={styles.logoImage} />
      </View>
      <Card>
      <CardSection>
        <Input
          label="Email:"
          placeholder="email@gmail.com"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          />
      </CardSection>

      <CardSection>
      <Input
        secureTextEntry
        label="Password:"
        placeholder="password"
        onChangeText={this.onPasswordChange.bind(this)}
        value={this.props.password}
        />
      </CardSection>

      <CardSection>
        {this.renderButton()}
      </CardSection>
      <View>
        <Text style={forgotPassStyle}> Forgot Password </Text>
      </View>
      <View style={divLine} />
      <CardSection>
      <RedButton onPress={this.onRedButtonPress.bind(this)}>
        Sign Up
      </RedButton>
      </CardSection>
      </Card>
      <DisplayState />
      </View>
    );
  }
}
const styles = {
  logoContainer: {
    paddingTop: 30,
    paddingBottom: 15,
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
  divLine: {
    borderColor: '#435b78',
    borderTopWidth: 1.5,
    paddingBottom: 25,
    marginTop: 15,
    marginRight: 45,
    marginLeft: 45,
    height: 2
  }
};

const mapStateToProps = state => {
 return {
  email: state.auth.email,
  password: state.auth.password,
  loading: state.auth.loading
  };
};
// use this to connect the action to the component. this gives us this.props. in the component
export default  connect(mapStateToProps, { emailChanged, passwordChanged, loginUser }) (LoginForm);
