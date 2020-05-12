import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CButton = (props) => {
 
    const { textStyle } = styles;

    let bgColor = props.bgColor;
    
  return (
    <TouchableOpacity onPress={props.onPress} style={{flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: bgColor, borderRadius: 50, marginLeft: 25, marginRight: 25}}>
      <Text style={textStyle}>{props.text.primary}/{props.text.secondary}</Text>
    </TouchableOpacity>
  );

};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};


export { CButton };
