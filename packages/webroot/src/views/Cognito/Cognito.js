import React, { Component } from 'react';
import { CCard, CCardHeader, CCardBody,CTabs, CNavItem, CNavLink, CNav, CTabContent, CTabPane, } from '@coreui/react';
import Users from './Users';
import Groups from './Groups';

class Cognito extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="animated fadeIn">
        <CCard>
          <CCardHeader>
            Users and Groups
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Users
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Groups
                  </CNavLink>
                </CNavItem>
              </CNav>
              <br/>
              <CTabContent>
                <CTabPane>
                  <Users />
                </CTabPane>
                <CTabPane>
                  <Groups />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default Cognito;