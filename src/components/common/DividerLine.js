import React from 'react';
import { View } from 'react-native';

const DividerLine = (props) => {
 const { divLine } = styles;
 return (
    <View style={divLine} />
  );
};

const styles = {

  divLine: {
    borderColor: '#435b78',
    borderTopWidth: 1.5,
    paddingBottom: 15,
    marginTop: 15,
    marginRight: 45,
    marginLeft: 45,
    height: 2
  }
};

export { DividerLine }
