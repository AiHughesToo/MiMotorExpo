import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { labelStyle, inputStyle, containerStyle } = styles;

  return (
   <View style={containerStyle}>
    <Text style={labelStyle}>{ label }</Text>
    <TextInput
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
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
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 10,
    flex: 1
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

export { Input };
