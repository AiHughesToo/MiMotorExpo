import React from 'react';
import { View } from 'react-native';
import { CardSectionStyle } from '../MainStyleSheet';


const BannerAdSection = (props) => {

  return (
     <View style={CardSectionStyle.bannerAd}>
     {props.children}
     </View>
  );

};

export  { BannerAdSection };
