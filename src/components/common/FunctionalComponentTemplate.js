// basic import lines to setup the react frameworks.
import React from 'react';
import { View, Text } from 'react-native';

// the functional component change the name to the file name
const FunctionalComponentTemplate = () => {
// must return some form of JSX
  return (
     <View>
     </View>
  );

};

// styling goes here
const styles = {
  containerStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.5,
    elevation: 1,
    position: 'relative'
  }
};

// remember to change this to title of the component This line makes it available to import in other parts
// of the app
export  { FunctionalComponentTemplate };