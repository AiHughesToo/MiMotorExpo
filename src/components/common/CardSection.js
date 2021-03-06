import React from 'react';
import { View } from 'react-native';
import { CardSectionStyle } from '../MainStyleSheet';


const CardSection = (props) => {

  return (
     <View style={CardSectionStyle.container}>
     {props.children}
     </View>
  );

};

export  { CardSection };
