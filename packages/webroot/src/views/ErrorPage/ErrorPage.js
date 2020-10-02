import React, { Component } from 'react';
import { CCol, CContainer, CRow } from '@coreui/react';
class ErrorPage extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="animated fadeIn">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">401</h1>
                <h4 className="pt-3">Oops! You{'\''}re unauthorized.</h4>
                <p className="text-muted float-left">Please contact admin for authorization.</p>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default ErrorPage;