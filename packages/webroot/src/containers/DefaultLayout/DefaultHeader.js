import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CToggler, CHeaderBrand, CHeaderNav, CBreadcrumbRouter } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';

// routes config
import { rootroutes } from '../../routes';

import DefaultHeaderDropdown from './DefaultHeaderDropdown'
import logo from '../../assets/img/brand/dxclogo.png'
//import sygnet from '../../assets/img/brand/coreui-signet.svg'
import { Auth } from 'aws-amplify';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({ username: user.attributes.name })
  }

  render() {

    const {
      toggleSidebarMobile,
      toggleSidebar,
      toggleTheme
    } = this.props;

    return (
      <>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon src={logo} height="48" alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          <h4>Safety Suite Dashboard</h4>
          <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={rootroutes} />
          {/* <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/users">Users</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink>Settings</CHeaderNavLink>
          </CHeaderNavItem> */}
        </CHeaderNav>

        <CHeaderNav>
          Hi, {this.state.username}
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={toggleTheme}
            title="Toggle Light/Dark Mode"
          >
            <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
            <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
          </CToggler>

          {/* <DefaultHeaderDropdown notif/>
          <DefaultHeaderDropdown tasks/>
          <DefaultHeaderDropdown mssgs/> */}
          <DefaultHeaderDropdown accnt />
          {/* <CToggler
            inHeader
            className="d-md-down-none"
            onClick={(e)=>toggleAside(e)}
          >
            <CIcon className="mr-2" size="lg" name="cil-applications-settings" />
          </CToggler> */}
        </CHeaderNav>

        {/* <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
          <ul className="d-md-down-none mfe-2 c-subheader-nav">
            <li className="c-subheader-nav-link">
              <CLink href="#">
                <CIcon name="cil-speech" alt="Settings" />
              </CLink>
            </li>
            <li className="c-subheader-nav-link">
              <CLink aria-current="page" href="#/dashboard">
                <CIcon name="cil-graph" alt="Dashboard" /> Dashboard
                </CLink>
            </li>
            <li className="c-subheader-nav-link">
              <CLink href="#">
                <CIcon name="cil-settings" alt="Settings" /> Settings
                </CLink>
            </li>
          </ul>
          <CHeaderNav className="d-md-down-none mfe-2 c-subheader-nav">
            <CHeaderNavItem className="c-subheader-nav-link">
              <CIcon name="cil-speech" alt="Settings" />
            </CHeaderNavItem>
            <CHeaderNavItem to="/dashboard" className="c-subheader-nav-link">
              <CIcon name="cil-graph" alt="Dashboard" /> Dashboard
         </CHeaderNavItem>
            <CHeaderNavItem className="c-subheader-nav-link">
              <CIcon name="cil-settings" alt="Settings" /> Settings
         </CHeaderNavItem>
          </CHeaderNav>
        </CSubheader> */}

      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
