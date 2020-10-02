import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer } from '@coreui/react';

// routes config
import { userroutes, adminroutes, rootroutes } from '../../routes';
import { Auth } from 'aws-amplify';

class DefaultContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routingarray: [],
      usergroup: "",
      adminflag: false,
      usergroupinfo: ""
    };
  }

  // shouldComponentUpdate() {
  //   return true;
  // }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({ usergroup: user.signInUserSession.accessToken.payload["cognito:groups"] })

    const group_array = user.signInUserSession.accessToken.payload["cognito:groups"]
    if (user.signInUserSession.accessToken.payload["cognito:groups"] === undefined) {
      this.setState({ usergroupinfo: "user" })
    }
    else {
      if (group_array.some((item) => item === "root") === true) {
        this.setState({ usergroupinfo: "root" })
      }
      else if (group_array.some((item) => item === "admins") === true) {
        this.setState({ usergroupinfo: "admin" })
      }
      else {
        this.setState({ usergroupinfo: "user" })
      }
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div></div>;

  render() {
    return (
      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={this.loading()}>
            <Switch>
              {this.state.usergroupinfo === undefined ? (
                userroutes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })
              ) :
                this.state.usergroupinfo === "root" ? (
                  rootroutes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })
                ) :

                  this.state.usergroupinfo === "admin" ? (
                    adminroutes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })
                  ) :
                    (userroutes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })
                    )}

              < Redirect from="/" to="/dashboards/homepage" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    );
  }
}

export default DefaultContent;