import React from 'react';
import { View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import LogonForm from './components/LogonForm';
import JobList from './components/JobList';
import JobPage from './components/JobPage';
import CustomerMain from './components/CustomerMain';
import SignUp from './components/SignUp';

const RouterComponent = () => {
const { headerColor, headerText } = styles;
  return (
    <Router navigationBarStyle={ headerColor } titleStyle={{ color: '#fff'}} backTitle=" " navBarButtonColor='#fff' >
      <Scene key='root' hideNavBar>
        <Scene key='auth'>
          <Scene key='login' component={LogonForm} title='MiMotor' titleStyle={ headerText } />
          <Scene key='signUp' component={SignUp} title='Register' />
        </Scene>
        <Scene key='rider'>
          <Scene key='jobList' component={JobList} title='Rider' />
        </Scene>
        <Scene key='jobMap'>
          <Scene key='onJob' component={JobPage} title='On the Job' />
        </Scene>
        <Scene key='client'>
          <Scene key='clientMain' component={CustomerMain} title='Client' />
        </Scene>
      </Scene>
    </Router>
  );
};

const styles = {
  headerColor: {
    backgroundColor: '#214557'
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    flex: 1
  }
};

export default RouterComponent;
