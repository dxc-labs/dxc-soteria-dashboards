import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom'
import { CCreateElement, CSidebar, CSidebarBrand, CSidebarNav, CSidebarNavDivider, CSidebarMinimizer } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { Auth } from 'aws-amplify';

//logo
import logo from '../../assets/img/brand/dxclogo.png'
import shortlogo from '../../assets/img/brand/dxclogo1.png'

// sidebar nav config
import { usernav, adminnav, rootnav } from '../../_nav';

class DefaultSidebar extends Component {

  handleCheck(val) {
    return this.state.data.some(item => val.name === item.name);
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    const group_array = user.signInUserSession.accessToken.payload["cognito:groups"]

    if (user.signInUserSession.accessToken.payload["cognito:groups"] === undefined) {
      window.sessionStorage.setItem("usertype", "User");
      this.setState({ sidebarmenu: usernav })
    }
    else {
      if (group_array.some((item) => item === "root") === true) {
        window.sessionStorage.setItem("usertype", "Admin");
        this.setState({ sidebarmenu: rootnav })
      }
      else if (group_array.some((item) => item === "admins") === true) {
        window.sessionStorage.setItem("usertype", "Admin");
        this.setState({ sidebarmenu: adminnav })
      }
      else {
        window.sessionStorage.setItem("usertype", "User");
        this.setState({ sidebarmenu: usernav })
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      minimize: props.sidebarMinimize,
      sidebarmenu: []
    };
    this.lastSidebarMinimize = props.sidebarMinimize;
  }

  render() {
    const {
      sidebarShow,
      sidebarMinimize,
      onChange,
    } = this.props;

    if (sidebarMinimize !== this.lastSidebarMinimize) {
      this.setState({ minimize: sidebarMinimize });
      this.lastSidebarMinimize = sidebarMinimize;
    }

    return (
      <CSidebar
        show={sidebarShow}
        unfoldable
        minimize={this.state.minimize}
        onShowChange={onChange}
        dropdownMode="closeInactive"
      >
        <CSidebarBrand className="d-md-down-none" to="/">
          <CIcon
            className="c-sidebar-brand-full"
            src={logo}
            height={55}
            width={200}
          />
          <CIcon
            className="c-sidebar-brand-minimized"
            src={shortlogo}
            height={35}
          />
        </CSidebarBrand>
        <Suspense>
          <CSidebarNav>
            <CCreateElement items={this.state.sidebarmenu} />

            <CSidebarNavDivider />
          </CSidebarNav>
        </Suspense>
        <CSidebarMinimizer className="c-d-md-down-none" />
      </CSidebar>
    );
  }
}

export default withRouter(DefaultSidebar);