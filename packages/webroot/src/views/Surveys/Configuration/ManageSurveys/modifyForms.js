import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CInput,
  CButton,
  CCollapse,
  CDataTable,
  CForm,
  CFormGroup,
  CTextarea,
  CLabel,
  CRow,
  CCol,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CModal
} from '@coreui/react'
import {
  CIcon
} from '@coreui/icons-react';
import { linearSet } from "@coreui/icons-pro/js/linear";
import { solidSet } from "@coreui/icons-pro/js/solid";
import { brandSet } from "@coreui/icons-pro/js/brand";
import { duotoneSet } from "@coreui/icons-pro/js/duotone";
import { Auth } from 'aws-amplify';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { render } from 'enzyme';
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/autorefresh';
React.icons = { ...solidSet, ...linearSet, ...brandSet, ...duotoneSet };

const axios = require('axios');
const baseURL = process.env.REACT_APP_API_DOMAIN

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.toggleDetails = this.toggleDetails.bind(this);
    this.toggle = this.toggle.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.deleteRecord = this.deleteRecord.bind(this);
    this.getFormData = this.getFormData.bind(this);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
    }

    this.state = {
      details: [],
      usersData: [],
      values: [],
      formDetails: [],
      formStaticData: [],
      updateFormDetails: [],
      modal: false,
      modalForm: false,
      isDeleted: false,
      dataDelete: [],
      formData: [],
      name: '',
      hover: true,
      isButtonDisabled: false,
      isUpdatingIndex: null,
      isUpdate: false,
      readOnly: false,
      mode: 'javascript',
      theme: ''
    }
  }

  componentDidMount() {
    this.getFormData()
  }

  toggle(data) {
    this.setState({ modal: !this.state.modal, dataDelete: data });
  }

  getAPIKey() {
    return Auth.user.signInUserSession.idToken.jwtToken
  }

  async getFormData() {
    try {
      var optionAxios = {
        headers: {
          'Authorization': this.getAPIKey()
        }
      }

      let response = await axios.get(`${baseURL}forms/admin/`, optionAxios)
      if (response.hasOwnProperty('data')) {
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].form = JSON.stringify(response.data[i].form, null, 2);
        }
        this.setState({ usersData: response.data })
      }
    }
    catch (error) {
      console.log("Error in Get Form Data : ", error);
    }
  }

  toggleDetails(index, item) {
    if (this.state.isUpdate == true && (this.state.isUpdatingIndex != null || this.state.isUpdatingIndex !== index)) {
      this.setState({ modal1: !this.state.modal1 })
      return;
    }
    this.setState({ formDetails: [] })
    this.setState({ formStaticData: [] })

    const position = this.state.details.indexOf(index);
    if (position !== -1) {
      this.state.details.splice(position, 1)
    } else {
      if (this.state.details) {
        this.state.details.splice(position, 1)
        this.state.details.push(index);
      } else {
        this.state.details.push(index);
      }
    }

    this.setState({ details: this.state.details })
    this.setState({ updateFormDetails: item })
    this.setState({ formDetails: item })
    this.setState({ formStaticData: item })
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    var optionAxios = {
      headers: {
        'Authorization': this.getAPIKey()
      }
    }
    let result = {};
    const formData = new FormData(event.target);
    for (var [key, value] of formData.entries()) {
      result[key] = value;
    }

    result['form'] = this.state.updateFormDetails.form;

    const validateJson = () => {
      try {
        result['form'] = JSON.parse(result.form);
      }
      catch (error) {
        ToastsStore.error('Invalid Form Definition');
        console.log(error)
        return false;
      }
      return true;
    }

      try {
        if (validateJson()) {
          let response = await axios.patch(`${baseURL}forms/admin/${this.state.formStaticData.pk}/${this.state.formStaticData.sk}`, result, optionAxios)
          this.getFormData();
          this.setState({ formDetails: { ['form']: JSON.stringify(result.form, null, 2) }, isButtonDisabled: true })
          ToastsStore.success(' ✔ Form updated successfully !!! ');
        }
      }
      catch (error) {
        ToastsStore.error(' Oops, Something Went Wrong !!! ');
      }
   
  }

  handleClick(index, item) {
    this.setState({ isUpdate: false })
    this.toggleDetails(index, item);
  }

  handleChange(event) {
    this.setState({ formDetails: { [event.target.name]: event.target.value }, isButtonDisabled: false })
    this.setState({ isUpdate: true })
  }

  async deleteRecord(id) {
    try {
      var auth = {
        'Authorization': this.getAPIKey()
      }
      let response = await axios.delete(`${baseURL}forms/admin/${id.pk}/${id.sk}`, { headers: auth })
      this.getFormData();
      ToastsStore.error(' Form deleted successfully !!! ');
      this.toggle();
      this.state.isDeleted = true;
    }
    catch (error) {
      ToastsStore.error(' Oops, Something Went Wrong !!! ');
    }
  }

  updateTheme() {
    if (window.sessionStorage.getItem("theme") === 'false') {
      this.setState({ theme: 'eclipse' })
    }
    else {
      this.setState({ theme: 'material' })
    }
  }

  interval = setInterval(() => {
    this.updateTheme();
  }, 100);

  render() {

    const fields = [
      { key: 'pk', label: 'Form ID', _style: { width: '20%' } },
      { key: 'name', label: 'Form Name' },
      { key: 'country', label: 'Country' },
      { key: 'category1', label: 'For' },
      { key: 'category2', label: 'Category' },
      { key: 'mandatedDays', label: 'Mandated Days' },
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
      }
    ]

    const options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode,
      theme: this.state.theme,
      autofocus: true,
      autoRefresh: true
    }

    if (this.instance) {
      setTimeout(() => this.instance.refresh(), 2);
    }

    return (
      <div className="animated">
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground />
        <CModal
          show={this.state.modal}
          onClose={this.toggle}
          centered>
          <CModalHeader closeButton>
            <CModalTitle>Are you sure you want to delete?</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="danger" onClick={() => this.deleteRecord(this.state.dataDelete)}>Delete</CButton>{' '}
            <CButton color="secondary" onClick={this.toggle}>Cancel</CButton>{' '}
          </CModalFooter>
        </CModal>

        <CModal
          show={this.state.modal1}
          onClose={this.toggleDetails}
          centered>
          <CModalHeader closeButton>
            <CModalTitle>Are you sure you want to discard?</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="danger" onClick={this.handleClick}>Yes</CButton>{' '}
            <CButton color="secondary" onClick={this.toggleDetails}>No</CButton>{' '}
          </CModalFooter>
        </CModal>

        <CCard>
          <CCardBody class="overflow-auto">
            <CButton variant="outline" onClick={() => { this.getFormData() }} className="float-right">
              <CIcon size={'xl'} name="cil-reload" className="float-right" />
            </CButton>
            <CDataTable
              items={this.state.usersData}
              fields={fields}
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots={{
                'show_details':
                  (item, index) => {
                    return (
                      <div>
                        <td className="py-2">
                          {this.state.details.includes(index) ?
                            <CIcon name="cid-eye-slash" onClick={() => { this.toggleDetails(index, item) }} /> :
                            <CIcon name="cis-eye" onClick={() => { this.toggleDetails(index, item) }} />}
                        </td>
                        <td className="py-2">
                          <CIcon name="cis-trash" onClick={() => { this.toggle(item) }} />
                        </td></div>
                    )
                  },

                'details':
                  (item, index) => {
                    return (
                      <CCollapse show={this.state.details.includes(index)}>
                        <CCardBody>
                          <CForm onSubmit={this.handleSubmit}>
                            <CLabel><h5>Form ID: {item.pk}  for  {item.category1}</h5></CLabel>
                            <CRow>
                              <CCol md={6}>
                                <CFormGroup>
                                  <CLabel>Form Name</CLabel>
                                  <CInput type="text" name="name" value={this.state.formDetails.name} onChange={this.handleChange} required />
                                </CFormGroup>
                              </CCol>
                              <CCol md={6}>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol md={6}>
                                <CFormGroup>
                                  <CLabel>Country</CLabel>
                                  <CInput type="text" name="country" value={this.state.formDetails.country} onChange={this.handleChange} required />
                                </CFormGroup>
                              </CCol>
                              <CCol md={6}>
                                <CFormGroup>
                                  <CLabel>Mandated Days</CLabel>
                                  <CInput type="number" name="mandatedDays" value={this.state.formDetails.mandatedDays} onChange={this.handleChange} required />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                            <CFormGroup>
                              <CLabel>Category</CLabel>
                              <CInput type="text" name="category2" value={this.state.formDetails.category2} onChange={this.handleChange} required />
                            </CFormGroup>
                            <CFormGroup>
                              <CLabel>Form Definition</CLabel>
                              <CodeMirror
                                options={options}
                                value={this.state.updateFormDetails.form}
                                autoCursor={false}
                                onChange={(editor, data, value) => {
                                  this.setState({ updateFormDetails: { ['form']: value }, isButtonDisabled: false })
                                }}
                                editorDidMount={editor => {
                                  // temp fix
                                  this.instance = editor; this.instance.refresh()
                                }}
                                required
                              />
                            </CFormGroup>
                            {(() => {
                              if (item.category1 == 'visitor') {
                                return (
                                  <CFormGroup>
                                    <h5>Survey Link : {item.surveyLink}</h5>
                                  </CFormGroup>
                                )
                              } else {
                                return (
                                  <CFormGroup>
                                    <h5>Survey Link : <a href={item.surveyLink} target="_blank">{item.surveyLink} </a></h5>
                                  </CFormGroup>
                                )
                              }
                            })()}
                            <CButton type="submit" color="primary" onClick={() => this.setState({ isUpdatingIndex: null, isUpdate: false })}
                              disabled={this.state.isButtonDisabled}>
                              {'Update'}
                            </CButton>
                          </CForm>
                        </CCardBody>
                      </CCollapse>
                    )
                  }
              }}
            />

          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default DataTable;