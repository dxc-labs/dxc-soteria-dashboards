import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CInvalidFeedback,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CInputRadio
} from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup'
import './ValidationForms.css'
import { Auth } from 'aws-amplify';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/mode/javascript/javascript';
import codemirror from 'codemirror/lib/codemirror';

const axios = require('axios');
const baseURL = process.env.REACT_APP_API_DOMAIN

const validationSchema = function (values) {
  return Yup.object().shape({
    name: Yup.string()
      .min(2, `Form name has to be at least 2 characters`)
      .max(30, `Form name can have atmost 30 characters`)
      .required('Form name is required'),
    category1: Yup.string()
      .required('Either Employee or Visitor forms should be selected'),
    country: Yup.string()
      .required('Country is required!'),
    mandatedDays: Yup.string()
      .required('Mandated Days is required!'),
    form: Yup.string()
      .required('Form Definition is required!'),
    category2: Yup.string()
      .required('Category is required!'),
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

class ValidationForms extends React.Component {

  defaultFormData = require('./defaultFormData.json')

  constructor(props) {
    super(props)
    this.touchAll = this.touchAll.bind(this);
    this.state = {
      readOnly: false,
      mode: "application/ld+json",
      theme: '',
      outputText: JSON.stringify(this.defaultFormData, null, 2)
    }
  }

  initialValues = {
    sk: "form",
    name: "",
    country: "",
    category2: "default",
    location: "{{SITE_PLACEHOLDER}}",
    mandatedDays: 14,
    form: JSON.stringify(this.defaultFormData, null, 2)
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


  getAPIKey = () => {
    return Auth.user.signInUserSession.idToken.jwtToken
  }
  onSubmit = async(values, { setSubmitting, setErrors }) => {
    var optionAxios = {
      headers: {
        'Authorization': this.getAPIKey()
      }
    }
    const validateJson = () => {
      try {
        values['form'] = JSON.parse(this.state.outputText)
        console.log(this.state.outputText)
      }
      catch (error) {
        ToastsStore.error('Invalid Form Definition');
        setSubmitting(false)
        return false;
      }
      return true;
    }

      try {
        if (validateJson()) {
          let response = await axios.post(baseURL + 'forms/admin', values, optionAxios)
          values['form'] = JSON.stringify(values.form, null, 2);
          setSubmitting(false)
          ToastsStore.success(' ✔ Form inserted successfully !!! ');
        }
      }
      catch (error) {
        ToastsStore.error(' Oops, Something Went Wrong !!! ');
        setSubmitting(false)
      }
  
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
    this.findFirstError('simpleForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  touchAll(setTouched, errors) {
    setTouched({
      firstName: true,
      lastName: true,
      userName: true,
      email: true,
      password: true,
      confirmPassword: true,
      accept: true
    }
    )
    this.validateForm(errors)
  }

  render() {
    const options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode,
      theme: this.state.theme,
      autofocus: true,
      autoRefresh: true
    }

    if (this.instance) {
      setTimeout(() => this.instance.refresh(), 200);
    }

    return (
      <div>
        <div className="animated fadeIn" id="container">
          <ToastsContainer
            position={ToastsContainerPosition.TOP_CENTER}
            store={ToastsStore}
            lightBackground />
          <CCard>
            <CCardBody>
              <Formik
                initialValues={this.initialValues}
                validate={validate(validationSchema)}
                onSubmit={this.onSubmit}
                render={
                  ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    handleReset,
                    dirty,
                    isValid,
                    setTouched
                  }) => (
                      <CForm onSubmit={handleSubmit} noValidate name='simpleForm'>

                        <CFormGroup>
                          <CLabel htmlFor="form_name">Form Name</CLabel>
                          <CInput type="text"
                            name="name"
                            id="name"
                            placeholder="Form Name"
                            autoComplete="given-name"
                            valid={!errors.name}
                            invalid={touched.name && !!errors.name}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name} />
                          <CInvalidFeedback>{errors.name}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="for">For</CLabel>
                          <br />
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio custom id="inline-radio1" name="category1" value="employee" onChange={handleChange}
                              onBlur={handleBlur} required />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Employee</CLabel>
                          </CFormGroup>
                          <CFormGroup variant="custom-radio" inline>
                            <CInputRadio custom id="inline-radio2" name="category1" value="visitor" onChange={handleChange}
                              onBlur={handleBlur} required />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Visitor</CLabel>
                            <CInvalidFeedback>{errors.category1}</CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="mandated_days">Country</CLabel>
                          <CInput type="text"
                            name="country"
                            id="country"
                            placeholder="Country"
                            autoComplete="given-name"
                            valid={!errors.country}
                            invalid={touched.country && !!errors.country}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.country} />
                          <CInvalidFeedback>{errors.country}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="mandated_days">Mandated Days</CLabel>
                          <CInput type="number"
                            name="mandatedDays"
                            id="mandatedDays"
                            placeholder="Mandated Days"
                            autoComplete="given-name"
                            valid={!errors.mandatedDays}
                            invalid={touched.mandatedDays && !!errors.mandatedDays}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mandatedDays} />
                          <CInvalidFeedback>{errors.mandatedDays}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="formDef">Form Definition</CLabel>
                          <CodeMirror
                            value={this.state.outputText}
                            options={options}
                            autoCursor={false}
                            onChange={(editor, data, value) => {
                              this.setState({ outputText: value });
                            }}
                            editorDidMount={editor => {
                              this.instance = editor;
                            }}
                          />
                          <CInvalidFeedback>{errors.form}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="category2">Category</CLabel>
                          <CInput type="text"
                            name="category2"
                            id="category2"
                            placeholder="default"
                            valid={!errors.category2}
                            invalid={touched.category2 && !!errors.category2}
                            autoFocus={true}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category2} />
                          <CInvalidFeedback>{errors.category2}</CInvalidFeedback>
                        </CFormGroup>
                        <CFormGroup>
                          <CButton type="submit" color="primary" className="mr-1"
                            disabled={!(isSubmitting || isValid && isSubmitting || dirty)}
                          >
                            {isSubmitting ? 'Wait...' : 'Submit'}
                          </CButton>
                          <CButton type="reset" color="danger" className="mr-1" onClick={handleReset}>Reset</CButton>
                        </CFormGroup>
                      </CForm>
                    )} />
            </CCardBody>
          </CCard>
        </div>
        <div id="container2"></div></div>
    )
  }
}


export default ValidationForms;
