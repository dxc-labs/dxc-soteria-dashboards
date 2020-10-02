import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CTextarea,
  CInputGroup,
  CInputGroupText
} from '@coreui/react'
import { Auth } from 'aws-amplify'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './ValidationForms.css'
import 'quill/dist/quill.snow.css'
import '../../../../assets/css/Dashboard/fonts/select.css'
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from 'react-toasts'

const validationSchema = function (values) {
  return Yup.object().shape({
    template_name: Yup.string()
      .min(2, 'template_name is mandatory')
      .required('template_name is required'),
    subject: Yup.string()
      .min(2, 'subject is mandatory')
      .required('subject is required'),
    htmlbody: Yup.string()
      .min(2, 'Body is mandatory')
      .required('subjBodyect is required')
  })
}

const validate = (getValidationSchema) => (values) => {
  const validationSchema = getValidationSchema(values)
  try {
    validationSchema.validateSync(values, { abortEarly: false })
    return {}
  } catch (error) {
    return getErrorsFromValidationError(error)
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce(
    (errors, error) => ({
      ...errors,
      [error.path]: error.errors[FIRST_ERROR]
    }),
    {}
  )
}

const region = process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID.split('_')
const initialValues = {
  template_name: '',
  subject: '',
  htmlbody: '',
  region: region[0]
}

const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
  const user = await Auth.currentAuthenticatedUser()
  const postdata = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.signInUserSession.idToken.jwtToken
    },
    body: JSON.stringify({
      template_name:
        process.env.REACT_APP_PROJECT +
        '-' +
        process.env.REACT_APP_TENANT +
        '-' +
        process.env.REACT_APP_ENV +
        '-' +
        values.template_name,
      subject: values.subject,
      htmlbody: values.htmlbody,
      region: values.region
    })
  }
  //console.log('Body of the api', postdata)
  fetch(
    `${process.env.REACT_APP_API_DOMAIN}dashboards/addsestemplate`,
    postdata
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.Status === 'Success') {
       // console.log('Cleared')
        setSubmitting(false)
        resetForm(initialValues)
        ToastsStore.success('Template Successfully Created!')
      }
    })
}

class CreateTemplate extends Component {
  constructor(props) {
    super(props)
    this.touchAll = this.touchAll.bind(this)

    this.state = {
      text: initialValues.htmlbody,
      shouldShowMain: false,
      Auth: ''
    }
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({ Auth: user.signInUserSession.idToken.jwtToken })
  }

  findFirstError(formName, hasError) {
    const form = document.forms[formName]
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus()
        break
      }
    }
  }

  validateForm(errors) {
    this.findFirstError('simpleForm', (fieldName) =>
      Boolean(errors[fieldName])
    )
  }

  touchAll(setTouched, errors) {
    setTouched({
      template_name: true,
      subject: true,
      htmlbody: true
    })
    this.validateForm(errors)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground
        />
        <br />
        <CRow>
          <CCol xs="6" sm="6" md="8">
            <CCard color="gradient-dark" className="text-white">
              <CCardHeader>Create New Email Template</CCardHeader>
              <CCardBody>
                <Formik
                  initialValues={initialValues}
                  validate={validate(validationSchema)}
                  onSubmit={onSubmit}
                  render={({
                    values,
                    errors,
                    touched,
                    status,
                    dirty,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    handleReset,
                    setTouched
                  }) => (
                      <CRow>
                        <CCol lg="12">
                          <CForm
                            onSubmit={handleSubmit}
                            noValidate
                            name="simpleForm"
                          >
                            <CFormGroup>
                              <CLabel htmlFor="template_name">
                                Template Name
                            </CLabel>
                              <CRow>
                                <CCol xs="12" sm="12" md="12">
                                  <CInputGroup className="input-prepend">
                                    <CInputGroupText>
                                      {process.env.REACT_APP_PROJECT +
                                        '-' +
                                        process.env.REACT_APP_TENANT +
                                        '-' +
                                        process.env.REACT_APP_ENV +
                                        '-' || ''}
                                    </CInputGroupText>
                                    <CInput
                                      type="text"
                                      name="template_name"
                                      id="template_name_create"
                                      placeholder="Template Name"
                                      autoComplete="given-name"
                                      valid={!errors.template_name}
                                      invalid={
                                        touched.template_name &&
                                        !!errors.template_name
                                      }
                                      autoFocus
                                      required
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.template_name || ''}
                                    />
                                    <CInvalidFeedback>
                                      {errors.template_name}
                                    </CInvalidFeedback>

                                  </CInputGroup>
                                </CCol>
                              </CRow>
                            </CFormGroup>

                            <CFormGroup>
                              <CLabel htmlFor="subject">Subject</CLabel>
                              <CInput
                                type="text"
                                name="subject"
                                id="subject_create"
                                placeholder="subject"
                                autoComplete="given-name"
                                valid={!errors.subject}
                                invalid={touched.subject && !!errors.subject}
                                autoFocus
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subject || ''}
                              />
                              <CInvalidFeedback>
                                {errors.subject}
                              </CInvalidFeedback>
                            </CFormGroup>

                            <CFormGroup>
                              <CLabel htmlFor="htmlbody">Body</CLabel>

                              <CTextarea
                                name="htmlbody"
                                id="htmlbody_create"
                                placeholder="body"
                                autoComplete="given-name"
                                valid={!errors.htmlbody}
                                invalid={touched.htmlbody && !!errors.htmlbody}
                                autoFocus
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.htmlbody || ''}
                              />

                              <CInvalidFeedback>
                                {errors.htmlbody}
                              </CInvalidFeedback>
                            </CFormGroup>

                            <CFormGroup>
                              <CRow>
                                <CCol xs="1" sm="1" md="12">
                                  <CButton
                                    type="submit"
                                    color="success"
                                    className="mr-1"
                                    disabled={isSubmitting || !isValid}
                                  >
                                    {isSubmitting ? 'Wait...' : 'Create'}
                                  </CButton>
                                  <CButton
                                    type="reset"
                                    color="danger"
                                    className="mr-1"
                                    onClick={handleReset}
                                  >
                                    Reset
                                </CButton>
                                  {isSubmitting ? (
                                    <div
                                      className="spinner-border text-info"
                                      role="status"
                                    >
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  ) : (
                                      ''
                                    )}
                                </CCol>
                              </CRow>
                            </CFormGroup>
                          </CForm>
                        </CCol>
                      </CRow>
                    )}
                />
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="6" sm="6" md="4">
            {/* <CCard color="gradient-secondary" className="text-black">
                            <CCardHeader> */}
            <b>Template Name: </b> Template Name should not contain any blank
            spaces.
            <br />
            {/* </CCardHeader>

                            <CCardBody> */}
            <b>Subject: </b> The subject of the Email Template.
            <br />
            <br />
            <b>Body: </b>
            The Body of the Email Template is in html format and can contain-
            <br />
            <ul>
              <li>
                Dynamic variables enclosed in
                {'{{ }}'} -<b>{'{{Variable}}'}</b>
              </li>
              <br />
              <li>
                HTML tags can be used to format the text in body -
                <b>{'<h2>Facility Dashboard</h2>'}</b>
              </li>
              <br />
            </ul>
          </CCol>
        </CRow>
      </div>
    )
  }
}
export default CreateTemplate
