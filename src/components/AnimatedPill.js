// basic import lines to setup the react frameworks.
import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';

// the functional component change the name to the file name
class AnimatedPill extends Component {
  constructor () {
    super()
    this.animatedValue = new Animated.Value(0)
  }
  componentWillMount () {
   this.animate()
  }
   animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  render () {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.3, 0]
    })
  const { buttonStyle, textStyle, animationHolder } = styles;
  return (
    <View style={buttonStyle}>
        <View style={animationHolder}>
        <View style={{width: 115}}>
          <Animated.Text
            style={{
              fontSize: 40,
              opacity,
              marginTop: -2,
              alignSelf: 'center',
              color: 'white'}} >
            (
          </Animated.Text>
        </View>
<Text style={textStyle}>Waiting for Rider</Text>
        <View style={{width: 115}}>
          <Animated.Text
            style={{
              fontSize: 40,
              opacity,
              marginTop: -2,
              alignSelf: 'center',
              color: 'white'}} >
            )
          </Animated.Text>
        </View>
        </View>
      </View>
  );
  }


};

const styles = {
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f8cd81',
    borderRadius: 50,
    marginLeft: 2,
    marginRight: 2
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 20
  },
  animationHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};


export default AnimatedPill;
