import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

const InputLarge = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
  const { inputStyle, containerStyle } = styles;

  return (
   <View style={containerStyle}>
    <TextInput
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    keyboardType={keyboardType}
    underlineColorAndroid='transparent'
    autoCorrect={false}
    autoCapitalize="none"
    value={value}
    onChangeText={onChangeText}
    style={ inputStyle }
    />
   </View>
  );

};

const styles = {
  inputStyle: {
    color: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 17,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#eee',
    alignItems: 'center'

  },

};

export { InputLarge };
