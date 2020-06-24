import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';
import { TextStyles } from "./MainStyleSheet";
import i18n from "i18n-js";

class UserCard extends Component {

render() {
const { displayStyle } = styles;
  return (
    <View style={displayStyle}>
    <Card>
      <CardSection>
        <Image source={require('../../assets/person.png')} style={styles.userImage} />
        <View>
          <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("hi")} {this.props.userName}</Text>
          <Text style={TextStyles.primaryLangStyleLrg}>{i18n.t("email")} {this.props.email}</Text>
        </View>
      </CardSection>
    </Card>
    </View>
  );
 }
}
const styles = {
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
