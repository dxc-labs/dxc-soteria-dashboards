import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Amplify from 'aws-amplify'
import AppRoutes from './AppRoutes'
import { CookiesProvider } from 'react-cookie'

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID.split('_')[0],
    userPoolId: process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID,
    userPoolWebClientId: process.env.REACT_APP_DASHBOARD_COGNITO_WEB_CLIENT_ID,
  },
})

class App extends Component {

  render() {
    return (
      <Router>
        <CookiesProvider>
          <React.Suspense fallback={loading()}>
            {/* <Switch>
              <Route path="/dashboards/locations" name="Home" render={props => <DefaultLayout {...props} />} />
            </Switch> */}
            <AppRoutes />
          </React.Suspense>
        </CookiesProvider >
      </Router>
    );
  }
}

export default App;