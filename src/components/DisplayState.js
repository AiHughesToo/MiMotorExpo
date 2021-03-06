import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class DisplayState extends Component {

render() {
const { textStyle, displayStyle } = styles;
  return (
    <View style={displayStyle}>
    <Text style={{ color: '#fff', fontSize: 9, paddingLeft: 10}}>Advertisement</Text>
    <Card>
    <Text style={textStyle}>Hello {this.props.userName}</Text>
    <Text style={textStyle}>Token: {this.props.token}</Text>
    <Text style={textStyle}>User Type: {this.props.user_type}</Text>
    </Card>
    </View>
  );
 }
}
const styles = {
  textStyle: {
    color: '#fff',
    fontSize: 10,
    padding: 5
  },
  displayStyle: {
    borderWidth: .5,
    borderColor: '#aaa',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10
  }
};

const mapStateToProps = state => {
 return {
  email: state.auth.email,
  token: state.auth.token,
  userName: state.auth.userName,
  user_type: state.auth.accountType
  };
};
export default connect(mapStateToProps, {}) (DisplayState);
