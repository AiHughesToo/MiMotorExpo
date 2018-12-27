import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class UserCard extends Component {

render() {
const { textStyle, displayStyle } = styles;
  return (
    <View style={displayStyle}>
    <Card>
      <CardSection>
        <Image source={require('../../assets/person.png')} style={styles.userImage} />
        <View>
          <Text style={textStyle}>Hello {this.props.userName}</Text>
          <Text style={textStyle}>Account Type: {this.props.user_type}</Text>
        </View>
      </CardSection>
    </Card>
    </View>
  );
 }
}
const styles = {
  textStyle: {
    color: '#fff',
    fontSize: 17,
    padding: 5
  },
  displayStyle: {
    padding: 5
  },
  userImage: {
    width: 70,
    height: 70,
    backgroundColor: '#1b364e',
    borderRadius: 35,
    marginRight: 10
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
export default connect(mapStateToProps, {}) (UserCard);
