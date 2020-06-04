import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TextStyles } from '../MainStyleSheet';

const CButton = (props) => {

    let bgColor = props.bgColor;
    
  return (
    <TouchableOpacity onPress={props.onPress} style={{flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: bgColor, borderRadius: 50, marginLeft: 25, marginRight: 25}}>
      <Text style={TextStyles.primaryLangStyleLrg}>{props.text.primary}</Text>
    </TouchableOpacity>
  );

};


export { CButton };
