import React, { Component, lazy } from 'react';
import { CCard } from "@coreui/react";
import { CIcon } from '@coreui/icons-react';

import { linearSet } from "@coreui/icons-pro/js/linear";
import { solidSet } from "@coreui/icons-pro/js/solid";
import { brandSet } from "@coreui/icons-pro/js/brand";
import { duotoneSet } from "@coreui/icons-pro/js/duotone";

React.icons = { ...solidSet, ...linearSet, ...brandSet, ...duotoneSet};

class CheckPoint extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  changedata(data) {
    this.setState({ code: data })
  }

  
  render() {

    return (
      <div className="animated fadeIn">
        <h1>Template</h1>
        <a href="https://coreui.io/react/demo/#/dashboard/">CoreUI Live Preview</a><br/>
        <a href="https://coreui.io/docs/2.1/getting-started/introduction/">CoreUI Documentation</a><br/>
        <a href="https://coreui.io/icons/">CoreUI (Pro) Icons</a>
      <br/><br/>
      <h3> CheckPoint Configuration - Component2</h3> <br/>
      <CIcon name="cil-energy" height={50} width={50} />
		  <CIcon name="cil-thumb-up" height={50} width={50} />
      <CIcon name="cis-bathroom" height={50} width={50} />
      <CIcon name="cib-react" height={50} width={50} /> 
      <CIcon name="cid-speak" height={50} width={50} />
      </div >
    );
  }
}

export default CheckPoint;