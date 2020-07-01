import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';

i18n.translations = {
  en: require("./src/translations/en.json"),
  es: require("./src/translations/sp.json")
}

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

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
