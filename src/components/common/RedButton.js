// basic import lines to setup the react frameworks.
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// the functional component change the name to the file name
const RedButton = (props) => {
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
    alignSelf: 'center',
    backgroundColor: '#d5624f',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

// remember to change this to title of the component This line makes it available to import in other parts
// of the app
export { RedButton };
