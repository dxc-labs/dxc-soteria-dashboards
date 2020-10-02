import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RouteAuthenticated from './services/RouteAuthenticated'
import RouteUnauthenticated from './services/RouteUnauthenticated'

//Authentication
const Signin = lazy(() => import('./views/Signin'))
const Signup = lazy(() => import('./views/Signup'))

//Default
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <RouteUnauthenticated path="/dashboards/signin" component={Signin} />
                <RouteUnauthenticated path="/dashboards/signup" component={Signup} />
                <RouteAuthenticated path="/" component={props => <DefaultLayout {...props} />} />
            </Switch>
        </Router>
    )
}

export default AppRoutes;