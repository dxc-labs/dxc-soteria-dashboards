import React, { Component } from 'react'
import { CCard, CCardHeader, CCardBody, CButton, CDataTable, CRow, CSelect, CCol } from '@coreui/react'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import '../../assets/css/Dashboard/fonts/select.css';
import { Auth } from 'aws-amplify';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.updateSelection = this.updateSelection.bind(this);
    this.state = {
      userlist: [],
      grouplist: [],
      selectitem: '',
      isSelection: false,
      Auth: ''
    }
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({ Auth: user.signInUserSession.idToken.jwtToken });

    const getdata = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': user.signInUserSession.idToken.jwtToken }
    }

    fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/getgroups", getdata)
      //fetch("https://972hl8oigk.execute-api.us-east-1.amazonaws.com/dev/getgroups")
      .then(response => response.json())
      .then(response => this.setState({ 'grouplist': response.Groups }))
  }

  updateSelection(evt) {
    this.setState({ selectitem: evt.target.value, isSelection: true });
    if (evt.target.value === 'default') {
      this.setState({ userlist: [], isSelection: false })
      ToastsStore.warning("Please select a group from the dropdown!")
    }

    else {
      const postdata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
        body: JSON.stringify({ groupname: evt.target.value })
      }
      fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/listusersingroup", postdata)
        //fetch("https://972hl8oigk.execute-api.us-east-1.amazonaws.com/dev/listusersingroup", postdata)
        .then(response => response.json())
        .then(response => this.setState({ 'userlist': response, isSelection: false }))
    }
  }

  render() {
    const fields = [
      { key: 'Name', _style: { width: '20%' } },
      { key: 'Email', _style: { width: '20%' } },
      { key: 'UserStatus', _style: { width: '20%' } }
    ]

    this.grouplist = this.state.grouplist.map((item, key) => {
      return <option value={item.GroupName} key={key}>{item.GroupName}</option>
    })

    return (
      <div className="animated">
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground />
        <CCard>
          <CCardHeader>
            Select the Group
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="5" sm="5" md="5">
                <CSelect onChange={this.updateSelection}>
                  <option value="default">Select a group</option>
                  {this.grouplist}
                </CSelect>
              </CCol>
              <CCol xs="1" sm="1" md="1">
                {this.state.isSelection ?
                  <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  : <></>}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <hr />

        <CDataTable
          items={this.state.userlist}
          fields={fields}
          columnFilter
          tableFilter
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          sorter
          pagination
        />
      </div >
    );
  }
}

export default DataTable;
