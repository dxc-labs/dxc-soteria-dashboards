import React, { Component } from 'react';
import { CSidebarNavDropdown, CSidebarNavItem } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { linearSet } from "@coreui/icons-pro/js/linear";
import { solidSet } from "@coreui/icons-pro/js/solid";
import { brandSet } from "@coreui/icons-pro/js/brand";
import { duotoneSet } from "@coreui/icons-pro/js/duotone";
import { Auth } from 'aws-amplify';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CDataTable,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCardFooter, CRow,
    CModal,
    CBadge,
    CCollapse, CSelect,
    CCol,
    CLabel
} from '@coreui/react'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import '../../assets/css/Dashboard/fonts/select.css';
React.icons = { ...solidSet, ...linearSet, ...brandSet, ...duotoneSet };

class Users extends Component {
    constructor(props) {
        super(props);
        this.updateSelection = this.updateSelection.bind(this);
        this.getuserdata = this.getuserdata.bind(this);
        this.state = {
            details: [],
            userlist: [],
            grouplist: [],
            usergroups: [],
            usermeta: [],
            userid: "",
            selectitem: '',
            editgroupaction: false,
            Auth: ''
        }
    }

    getuserdata(index, userdetails) {
        this.setState({ 'usergroups': [] })
        this.setState({ 'usermeta': [] })
        const position = this.state.details.indexOf(index);
        (position !== -1) ? this.state.details.splice(position, 1) :
            this.state.details.push(index);
        this.setState({ details: this.state.details })

        const postdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
            body: JSON.stringify({ username: userdetails.Username })
        }
        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/listgroupsforuser", postdata)
            .then(response => response.json())
            .then(response => this.setState({ 'usergroups': response.Groups }))

        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/getusermetadata", postdata)
            .then(response => response.json())
            .then(response => this.setState({ 'usermeta': response.UserAttributes, 'userid': response.Username }))
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();
        this.setState({ Auth: user.signInUserSession.idToken.jwtToken });
        const getdata = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': user.signInUserSession.idToken.jwtToken }
        }
        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/getusers", getdata)
            .then(response => response.json())
            .then(response => this.setState({ 'userlist': response }))

        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/getgroups", getdata)
            .then(response => response.json())
            .then(response => this.setState({ 'grouplist': response.Groups }))
    }

    updateSelection(evt) {
        this.setState({ selectitem: evt.target.value, editgroupaction: false });
    }

    addtogroup() {
        this.setState({ editgroupaction: true })
        if (this.state.selectitem === 'default') {
            ToastsStore.warning("Please select a group from the dropdown!")
            this.setState({ editgroupaction: false })
        }
        else if (this.state.selectitem === '') {
            ToastsStore.warning("Please select a group from the dropdown!")
            this.setState({ editgroupaction: false })
        }
        else {
            const postdata = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
                body: JSON.stringify({ username: this.state.userid, groupname: this.state.selectitem })
            }

            fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/addusertogroup", postdata)
                .then(response => response.json())
                .then(response => {
                    if (response.status === 'success') {
                        const postdatauser = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
                            body: JSON.stringify({ username: this.state.userid })
                        }

                        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/listgroupsforuser", postdatauser)
                            .then(response => response.json())
                            .then(response => this.setState({ 'usergroups': response.Groups }))
                        ToastsStore.success('Successfully added user to group');
                        this.setState({ editgroupaction: false })
                    }
                })
        }
    }

    removefromgroup() {
        this.setState({ editgroupaction: true })
        if (this.state.selectitem === 'default') {
            this.setState({ editgroupaction: false })
            ToastsStore.warning("Please select a group from the dropdown!")
        }
        else if (this.state.selectitem === '') {
            ToastsStore.warning("Please select a group from the dropdown!")
            this.setState({ editgroupaction: false })
        }
        else {
            const postdata = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
                body: JSON.stringify({ username: this.state.userid, groupname: this.state.selectitem })
            }

            fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/removeuserfromgroup", postdata)
                .then(response => response.json())
                .then(response => {
                    if (response.status === 'success') {
                        const postdatauser = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
                            body: JSON.stringify({ username: this.state.userid })
                        }
                        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/listgroupsforuser", postdatauser)
                            .then(response => response.json())
                            .then(response => this.setState({ 'usergroups': response.Groups }))
                        ToastsStore.success('Successfully removed user from group');
                        this.setState({ editgroupaction: false })
                    }
                })
        }
    }

    deleteuser(index, userdetails){
        this.setState({ editgroupaction: true })
            const postdata = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
                body: JSON.stringify({ username: this.state.userid, groupname: this.state.selectitem })
            }
            //fetch('https://972hl8oigk.execute-api.us-east-1.amazonaws.com/dev/deleteuser', postdata)
            fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/deleteuser", postdata)
                .then(response => response.json())
                .then(response => {
                    if (response.status === 'success') {
                        const getdata = {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth }
                        }
                        fetch(process.env.REACT_APP_API_DOMAIN + "dashboards/getusers", getdata)
                        .then(response => response.json())
                        .then(response => this.setState({ 'userlist': response }))
                        ToastsStore.success('Successfully removed user');
                        this.setState({ editgroupaction: false })
                        const position = this.state.details.indexOf(index);
                        (position !== -1) ? this.state.details.splice(position, 1) :
                            this.state.details.push(index);
                        this.setState({ details: this.state.details })
                    }
                })
    }
    
    render() {
        const fields = [
            { key: 'Name', _style: { width: '20%' } },
            { key: 'Email', _style: { width: '20%' } },
            { key: 'UserStatus', _style: { width: '20%' } },
            {
                key: 'show_details',
                label: '',
                _style: { width: '7%' },
                sorter: false,
                filter: false
            }
        ]

        const grouparray = []
        this.state.usergroups.map((item, key) => {
            grouparray.push(item.GroupName)
        })

        this.usermeta = this.state.usermeta.map((item, key) => {
            if (item.Name === 'name') {
                return <p key={key} >Name: {item.Value}</p>
            }
            if (item.Name === 'email') {
                return <p key={key}>Email: {item.Value}</p>
            }
        }
        );
        this.grouplist = this.state.grouplist.map((item, key) => {
            return <option value={item.GroupName} key={key}>{item.GroupName}</option>
        })

        return (
            <div className="animated">
                <ToastsContainer
                    position={ToastsContainerPosition.TOP_CENTER}
                    store={ToastsStore}
                    lightBackground />
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
                    // onRowClick={(item, index, col, e) => this.getuserdata(item)}
                    scopedSlots={{
                        'status':
                            (item) => (
                                <td>
                                    <CBadge color="info">
                                        Badge
                                    </CBadge>
                                </td>
                            ),
                        'show_details':
                            (item, index) => {
                                return (
                                    <td className="py-2">
                                        {this.state.details.includes(index) ?
                                            <CIcon name="cid-eye-slash" onClick={() => { this.getuserdata(index, item) }} />
                                            : <CIcon name="cis-eye" onClick={() => { this.getuserdata(index, item) }} />} &nbsp;&nbsp;&nbsp;&nbsp;
                                            <CIcon name="cil-trash" height={15} width={15} onClick={(e) => this.deleteuser(index, item)} />
                                    </td>
                                )
                            },


                        'details':
                            (item, index) => {
                                return (
                                    <CCollapse show={this.state.details.includes(index)}>
                                        <CCardFooter>
                                            {this.usermeta}
                                            Associated Group(s): {grouparray.join(", ")}
                                            <br /> <br />
                                            <CLabel> Select a Group that you want to Add/Remove. </CLabel>
                                            <CRow>
                                                <CCol xs="6" sm="6" md="5">
                                                    <CSelect onChange={this.updateSelection}>
                                                        <option value="default">Select a group</option>
                                                        {this.grouplist}
                                                    </CSelect>
                                                </CCol>
                                                {this.state.editgroupaction ?
                                                    <div class="spinner-border text-info" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                    : <></>}

                                                <CCol xs="6" sm="6" md="4">
                                                    <CIcon name="cil-plus-circle" height={25} width={25} onClick={(e) => this.addtogroup()} disabled={this.state.editgroupaction} />
                                                    &nbsp;&nbsp;
                                                    <CIcon name="cil-minus-circle" height={25} width={25} onClick={(e) => this.removefromgroup()} disabled={this.state.editgroupaction} />
                                                    {/* &nbsp;&nbsp;
                                                    <CIcon name="cil-x-circle" height={25} width={25} onClick={(e) => this.deleteuser(index, item)} disabled={this.state.editgroupaction} /> */}
                                                </CCol>
                                            </CRow>
                                        </CCardFooter>
                                    </CCollapse>
                                )
                            }
                    }}
                />
            </div>
        );
    }
}

export default Users;