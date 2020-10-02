import React from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import {
  signIn,
  answerCustomChallenge,
  getCurrentUser,
} from '../../services/Auth';
import classNames from 'classnames';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

class Signin extends React.Component {
  constructor() {
    super();
    this.updateInput = this.updateInput.bind(this);
    this.updateChallenge = this.updateChallenge.bind(this);
    this.state = {
      challenge: '',
      IsEmailValid: true,
      IsInvalidEmail: false,
      IsInvalidOTP: false,
      IsEmptyemail: false,
      email: '',
      themeDark: true,
    };
  }

  updateInput(evt) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (evt.target.value === '' || re.test(evt.target.value)) {
      this.setState({ email: evt.target.value });
    }
  }

  updateChallenge(evt) {
    const challenge = evt.target.value;
    this.setState({ challenge });
  }

  goback() {
    this.setState({ IsEmailValid: true });
    this.setState({ IsInvalidOTP: false });
  }
  async handleSignIn() {
    const signinemail = this.state.email;
    var result = await signIn(signinemail);
    ToastsStore.success('OTP successfully sent to ' + this.state.email + ' !');
    if (result === undefined) {
      this.setState({ IsEmailValid: false });
    } else {
      if (result.code === 'UserNotFoundException') {
        this.setState({ IsInvalidEmail: true });
        ToastsStore.warning('Account not found!');
        this.props.history.push('/dashboards/signup');
      }
    }
  }

  async handleChallenge() {
    console.log('This func');
    const challenge = this.state.challenge;
    const loginSucceeded = await answerCustomChallenge(challenge);
    if (loginSucceeded) {
      const user = await getCurrentUser();
      const { attributes } = user;
      document.cookie = `dashboardsid=${attributes.sub}`;
      this.props.history.push('/dashboards/homepage');
    } else {
      this.setState({ IsInvalidOTP: true });
      console.log('error');
    }
  }

  render() {
    if (this.state.email === '') {
      this.state.IsEmptyemail = true;
    }
    // dark theme
    const classes = classNames(
      'c-app c-default-layout',
      this.state.themeDark ? 'c-dark-theme' : false,
    );
    return (
      <div className={classes}>
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground
        />
        {this.state.IsEmailValid ? (
          <>
            <main className="c-main">
              <CContainer fluid>
                <CRow className="justify-content-center">
                  <CCol md="6">
                    <CCardGroup>
                      <CCard color="gradient-dark" className="text-white">
                        <CCardBody>
                          <CForm
                            onSubmit={(e) => {
                              e.preventDefault();
                              this.handleSignIn();
                            }}>
                            <CRow className="justify-content-center">
                              <h1>Soteria</h1>
                            </CRow>
                            <h4>Sign In</h4>
                            <p className="text-muted">
                              Sign In to your account
                            </p>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                type="text"
                                placeholder="Email Id"
                                autoComplete="username"
                                required
                                onChange={this.updateInput}
                              />
                            </CInputGroup>

                            {this.state.IsInvalidEmail ? (
                              <p> User Not found!</p>
                            ) : (
                              <></>
                            )}

                            <CRow>
                              <CCol xs="6">
                                <CButton
                                  type="submit"
                                  color="primary"
                                  className="px-4"
                                  // onClick={(e) => {
                                  //   e.preventDefault();
                                  //   this.handleSignIn();
                                  // }}
                                  disabled={!this.state.email}>
                                  Sign In
                                </CButton>
                              </CCol>
                              <CCol xs="6" className="text-right">
                                <Link to="/dashboards/signup">
                                  <CButton color="link" className="px-0">
                                    Signup?
                                  </CButton>
                                </Link>
                              </CCol>
                            </CRow>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </CContainer>
            </main>
          </>
        ) : (
          <main className="c-main">
            <CContainer fluid>
              <CRow className="justify-content-center">
                <CCol md="6">
                  <CCardGroup>
                    <CCard color="gradient-dark" className="text-white">
                      <CCardBody>
                        <CForm
                          onSubmit={(e) => {
                            e.preventDefault();
                            this.handleChallenge();
                          }}>
                          <CRow className="justify-content-center">
                            <h1>Soteria</h1>
                          </CRow>
                          <p className="text-muted">Enter OTP</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              placeholder="OTP"
                              autoComplete="challenge"
                              onChange={this.updateChallenge}
                            />
                          </CInputGroup>
                          {this.state.IsInvalidOTP ? (
                            <p> Invalid OTP!</p>
                          ) : (
                            <></>
                          )}
                          <CRow>
                            <CCol xs="6">
                              <CButton
                                color="primary"
                                className="px-4"
                                type="submit"
                                disabled={!this.state.challenge}>
                                Sign In
                              </CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton
                                onClick={() => this.goback()}
                                color="link"
                                className="px-0">
                                Go Back to Signin
                              </CButton>
                              {'     |     '}
                              <Link to="/dashboards/signup">
                                <CButton color="link" className="px-0">
                                  Signup?
                                </CButton>
                              </Link>
                            </CCol>
                          </CRow>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCardGroup>
                </CCol>
              </CRow>
            </CContainer>
          </main>
        )}
      </div>
    );
  }
}

export default Signin;
