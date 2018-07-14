import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LogonForm';

class App extends Component {

render() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
      <View style={{backgroundColor: '#2d2b39', flex: 1}}>
      <ImageBackground source={require('./assets/main_background.png')} style={styles.backgroundImage}>
      <Header headerText="MiMotor" />
      <LoginForm />
      </ImageBackground>
      </View>
      </Provider>
    );
  }
}
const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
};

export default App;
