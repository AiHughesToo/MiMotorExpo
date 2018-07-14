// import libraries for making a component
import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';

// make component
const Header = (props) => {
 const { textStyle, viewStyle, shadowView } = styles;
 return (
    <View style={shadowView}>
    <ImageBackground source={require('../../../assets/header_image.png')} style={styles.backgroundImage}>
    <View style={viewStyle}>
     <Text style={textStyle}>{props.headerText}</Text>
     </View>
    </ImageBackground>
    </View>
  );
};

const styles = {
  viewStyle: {
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  paddingTop: 10,
  marginBottom: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5},
  shadowOpacity: 0.5,
  elevation: 4,
  position: 'relative'
  },
  shadowView: {
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.5,
    elevation: 2,
 },
  textStyle: {
   color: '#fff',
   fontSize: 20
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
};

// make the component available to other files
export { Header} ;
