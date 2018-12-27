import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LogonForm';
import Router from './src/Router';

class App extends Component {

render() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
      <View style={{flex: 1}}>
      <Router />
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
