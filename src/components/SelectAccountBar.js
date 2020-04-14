import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { selectMotor, selectClient } from '../actions';
import { Card, CardSection, Input, Button, RedButton, Spinner, DividerLine } from './common';

class SelectAccountBar extends Component {

  renderMotorImage() {
    if (this.props.accountType == 'rider') {
    return ( <Image source={require('../../assets/temp_logo.png')} style={styles.logoImage} />
    );
    }
    return ( <Image source={require('../../assets/temp_logo_gray.png')} style={styles.logoImage} />);
  }

  onSelectMotor() {
    this.props.selectMotor();
  }

    renderClientImage() {
      if (this.props.accountType == 'client') {
      return ( <Image source={require('../../assets/person.png')} style={styles.logoImage} />
      );
      }
      return ( <Image source={require('../../assets/person_gray.png')} style={styles.logoImage} />);
    }

    onSelectClient() {
      this.props.selectClient();
    }

  render() {
const { barStyle, buttonViewStyle, textStyle } = styles;
  return (
      <View style={ barStyle }>
      <TouchableWithoutFeedback onPress={this.onSelectMotor.bind(this)}>
        <View style={ buttonViewStyle }>
          {this.renderMotorImage()}
          <Text style={ textStyle }> Motorista </ Text>
        </View>
      </ TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={this.onSelectClient.bind(this)}>
        <View style={ buttonViewStyle }>
          {this.renderClientImage()}
          <Text style={ textStyle }> Client </ Text>
        </View>
      </ TouchableWithoutFeedback>
      </View>
    );
  }
  }

  const styles = {
  logoImage: {
    width: 100,
    height: 98
  },
  textStyle: {
    color: '#fff',
    alignSelf: 'center',
    paddingTop: 5,
    fontSize: 17
  },
  buttonViewStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#eee',
    margin: 15,
    alignItems: 'center',
    padding: 2
  },
  barStyle: {
    flexDirection: 'row',
    height: 160,
    marginTop: 5,
    marginBottom: 5
 }
  };

  const mapStateToProps = state => {
   return {
    accountType: state.auth.accountType,
    error: state.auth.error
    };
  };

export default connect(mapStateToProps, { selectMotor, selectClient }) (SelectAccountBar);
