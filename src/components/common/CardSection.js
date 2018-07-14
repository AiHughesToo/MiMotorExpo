// basic import lines to setup the react frameworks.
import React from 'react';
import { View, Text } from 'react-native';

// the functional component change the name to the file name
const CardSection = (props) => {
// must return some form of JSX
  return (
     <View style={styles.containerStyle}>
     {props.children}
     </View>
  );

};

// styling goes here
const styles = {
  containerStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

// normally written export default CardSection;  but when using an index.js file
// in a directory wen need to have a key value pair but es6 allows us to use just value if both are the same.
export  { CardSection };
