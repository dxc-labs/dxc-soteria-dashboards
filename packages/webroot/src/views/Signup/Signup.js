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
import { signUp } from '../../services/Auth';
import classNames from 'classnames';

class Signup extends React.Component {
  constructor() {
    super();
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.state = {
      email: '',
      name: '',
      IsEmailValid: true,
      IsInvalidEmail: false,
      themeDark: true,
    };
  }

  updateName(evt) {
    const name = evt.target.value;
    this.setState({ name });
  }

  updateEmail(evt) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (evt.target.value === '' || re.test(evt.target.value)) {
      this.setState({ email: evt.target.value });
    }
  }

  goback() {
    this.setState({ IsEmailValid: true });
  }

  async handleSignUp() {
    const name = this.state.name;
    const email = this.state.email;
    const result = await signUp(email, name);
    if (result === undefined) {
      this.setState({ IsInvalidEmail: false });
      this.props.history.push('/dashboards/signin');
    } else {
      if (result.code === 'InvalidParameterException') {
        this.setState({ IsInvalidEmail: true });
      }
    }
  }

  render() {
    // dark theme
    const classes = classNames(
      'c-app c-default-layout',
      this.state.themeDark ? 'c-dark-theme' : false,
    );
    return (
      <div className={classes}>
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
                          this.handleSignUp();
                        }}>
                        <CRow className="justify-content-center">
                          <h1>Soteria</h1>
                        </CRow>
                        <h4>Sign Up</h4>
                        <p className="text-muted">Create a new account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="Full Name"
                            autoComplete="fullnane"
                            onChange={this.updateName}
                          />
                        </CInputGroup>

                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-at" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="email"
                            autoComplete="email"
                            onChange={this.updateEmail}
                          />
                        </CInputGroup>

                        {this.state.IsInvalidEmail ? (
                          <p> Invalid Email ID!</p>
                        ) : (
                          <></>
                        )}

                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                              disabled={!this.state.email || !this.state.name}>
                              Sign Up
                            </CButton>
                          </CCol>

                          <CCol xs="6" className="text-right">
                            <Link to="/dashboards/signin">
                              <CButton color="link" className="px-0">
                                Signin?
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
      </div>
    );
  }
}

export default Signup;
