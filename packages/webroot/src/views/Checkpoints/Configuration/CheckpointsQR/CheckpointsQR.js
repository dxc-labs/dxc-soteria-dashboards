import React, { Component, lazy } from 'react';
import { CCard } from "@coreui/react";
import { CIcon } from '@coreui/icons-react';

import { linearSet } from "@coreui/icons-pro/js/linear";
import { solidSet } from "@coreui/icons-pro/js/solid";
import { brandSet } from "@coreui/icons-pro/js/brand";
import { duotoneSet } from "@coreui/icons-pro/js/duotone";

import Start from './CPQRGen';

React.icons = { ...solidSet, ...linearSet, ...brandSet, ...duotoneSet};


class CheckpointsQR extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  changedata(data) {
    this.setState({ code: data })
  }

  
  render() {
		return (
			<div className="animated fadeIn">
				<Start />
			</div >
		);
	}
}

export default CheckpointsQR;
