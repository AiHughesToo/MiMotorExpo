// basic import lines to setup the react frameworks.
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// the functional component change the name to the file name
const TakeButton = (props) => {
// this line applies the styling to the component
    const { buttonStyle, textStyle } = styles;
// must return some form of JSX
  return (
    <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
      <Text style={textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );

};

// styling goes here
const styles = {
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#96bd76',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 15,
    marginLeft: 20,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  }
};


export { TakeButton };
