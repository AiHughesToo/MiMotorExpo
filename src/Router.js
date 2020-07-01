import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LogonForm from './components/LogonForm';
import JobList from './components/JobList';
import JobPage from './components/JobPage';
import CustomerMain from './components/CustomerMain';
import SignUp from './components/SignUp';
import RiderStats from './components/riderStats';
import ResetPassword from './components/ResetPassword';
import i18n from "i18n-js";

const RouterComponent = () => {
const { headerColor, headerText } = styles;
  return (
    <Router navigationBarStyle={ headerColor } titleStyle={{ color: '#fff'}} backTitle=" " navBarButtonColor='#fff' >
      <Scene key='root' hideNavBar>
        <Scene type="replace" key='auth'>
          <Scene type="replace" key='login' component={LogonForm} title={i18n.t("title")} titleStyle={ headerText } />
          <Scene type="replace" key='signUp' component={SignUp} title={i18n.t("register")} />
          <Scene type="replace" key='resetPassword' component={ResetPassword} title={i18n.t("re_pass")} />
        </Scene>
        <Scene key='rider'>
          <Scene  key='jobList' component={JobList} title={i18n.t("job_list")} /> 
          <Scene key='riderStats' component={RiderStats} title={i18n.t("stats")} /> 
        </Scene>
        <Scene type="replace" key='jobMap'>
          <Scene type="replace" key='onJob' component={JobPage} title={i18n.t("working")} />
        </Scene>
        <Scene type="replace" key='client'>
          <Scene type="replace" key='clientMain' component={CustomerMain} title={i18n.t("ride_request")} />
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
