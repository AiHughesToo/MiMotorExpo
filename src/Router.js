import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LogonForm from './components/LogonForm';
import JobList from './components/JobList';
import JobPage from './components/JobPage';
import CustomerMain from './components/CustomerMain';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import { E_MAIN_TITLE, MAIN_TITLE, E_REGISTER, REGISTER, WORKING, JOB_LIST } from './LanguageFile';

const RouterComponent = () => {
const { headerColor, headerText } = styles;
  return (
    <Router navigationBarStyle={ headerColor } titleStyle={{ color: '#fff'}} backTitle=" " navBarButtonColor='#fff' >
      <Scene key='root' hideNavBar>
        <Scene key='auth'>
          <Scene key='login' component={LogonForm} title={MAIN_TITLE} titleStyle={ headerText } />
          <Scene key='signUp' component={SignUp} title={REGISTER} />
        </Scene>
        <Scene key='rider'>
          <Scene key='jobList' component={JobList} title={JOB_LIST} /> 
        </Scene>
        <Scene key='jobMap'>
          <Scene key='onJob' component={JobPage} title={WORKING} />
        </Scene>
        <Scene key='client'>
          <Scene key='clientMain' component={CustomerMain} title='Client' />
        </Scene>
        <Scene key='resetPassword'>
          <Scene key='reset' component={ResetPassword} title='Reset Password' />
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
