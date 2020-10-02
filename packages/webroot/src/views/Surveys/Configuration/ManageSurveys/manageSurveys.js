import React, { Component } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody, CTabs, CNavItem,
  CNavLink, CNav, CTabContent,
  CTabPane,
} from '@coreui/react';
import CreateForm from './createForm';
import ModifyForms from './modifyForms';

class Surveys extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="animated fadeIn">

        <CCard>
          <CCardHeader>
            <h4>Manage Surveys</h4>
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <h5>List / Edit / Delete Forms</h5>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <h5>Create Form</h5>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <ModifyForms />
                </CTabPane>
                <CTabPane>
                  <CreateForm />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default Surveys;