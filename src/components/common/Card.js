// basic import lines to setup the react frameworks.
import React from 'react';
import { View } from 'react-native';

// the functional component
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
 containerStyle: {
   elevation: 1,
   marginLeft: 5,
   marginRight: 5,
   marginTop: 10
 }
};

// this is set to the title of the component.
export { Card };
