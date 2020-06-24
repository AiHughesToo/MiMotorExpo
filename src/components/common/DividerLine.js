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
    borderColor: '#999999',
    borderTopWidth: 1.5,
    paddingBottom: 5,
    marginTop: 5,
    marginRight: 45,
    marginLeft: 45,
    height: 2
  }
};

export { DividerLine }
