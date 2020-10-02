import React, {Component} from 'react';
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
  CSelect,
} from '@coreui/react';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as Yup from 'yup';
import './ValidationForms.css';
import 'quill/dist/quill.snow.css';
import '../../../../assets/css/Dashboard/fonts/select.css';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

const validationSchema = function(values) {
  return Yup.object().shape({
    template_name: Yup.string()
        .min(2, 'template_name is mandatory')
        .required('template_name is required'),
    subject: Yup.string()
        .min(2, 'subject is mandatory')
        .required('subject is required'),
    htmlbody: Yup.string()
        .min(2, 'Body is mandatory')
        .required('subjBodyect is required'),
  });
};

const validate = (getValidationSchema) => (values) => {
  const validationSchema = getValidationSchema(values);
  try {
    validationSchema.validateSync(values, {abortEarly: false});
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
};

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce(
      (errors, error) => ({
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }),
      {},
  );
};

const initialValues = {
  template_name: '',
  subject: '',
  htmlbody: '',
};

const onSubmit = async (values, {setSubmitting, setErrors, resetForm}) => {
  const user = await Auth.currentAuthenticatedUser();
  const postdata = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': user.signInUserSession.idToken.jwtToken,
    },
    body: JSON.stringify(values),
  };
  fetch(
      `${process.env.REACT_APP_API_DOMAIN}dashboards/updatesestemplate`,
      postdata,
  )
      .then((response) => response.json())
      .then((response) => {
        if (response.Status === 'Success') {
          setSubmitting(false);
          resetForm(initialValues);
          ToastsStore.success('Template successfully updated!');
        }
      });
};

class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.touchAll = this.touchAll.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.state = {
      text: initialValues.htmlbody,
      templatedata: [],
      shouldShowMain: false,
      seltempdata: [],
      seltempdataarray: [],
      templatelist: [],
      selectitem: '',
      isSend: false,
      Auth: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  findFirstError(formName, hasError) {
    const form = document.forms[formName];
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus();
        break;
      }
    }
  }

  validateForm(errors) {
    this.findFirstError('simpleForm', (fieldName) =>
      Boolean(errors[fieldName]),
    );
  }

  touchAll(setTouched, errors) {
    setTouched({
      template_name: true,
      subject: true,
      htmlbody: true,
    });
    this.validateForm(errors);
  }

  handleChange(value) {
    this.setState({text: value});
  }

  updateSelection(evt) {
    this.setState({selectitem: evt.target.value});
  }

  getselectedtemplate() {
    this.setState({isSelect: true});
    if (this.state.selectitem === '') {
      ToastsStore.warning('Please select a template from the dropdown!');
    } else if (this.state.selectitem === 'default') {
      ToastsStore.warning('Please select a template from the dropdown!');
      this.setState({isSelect: false});
    } else {
      const postdata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.Auth,
        },
        body: JSON.stringify({
          template_name: this.state.selectitem,
          region: this.region[0],
        }),
      };
      fetch(
          `${process.env.REACT_APP_API_DOMAIN}dashboards/getsestemplatedata`,
          postdata,
      )
          .then((response) => response.json())
          .then((response) => this.setState({seltempdata: response}))
          .then(ToastsStore.success('Successfully loaded the template!'));
      this.setState({isSelect: false});
    }
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({Auth: user.signInUserSession.idToken.jwtToken});
    this.region = process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID.split(
        '_',
    );
    const postdata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.Auth,
      },
      body: JSON.stringify({region: this.region[0]}),
    };

    fetch(
        `${process.env.REACT_APP_API_DOMAIN}dashboards/getsestemplates`,
        postdata,
    )
        .then((response) => response.json())
        .then((response) => this.setState({templatedata: response}));
  }

  render() {
    const templatesunfiltered = [];

    this.templates = this.state.templatedata.map((item, index) =>
      typeof item.templates === 'object' ?
        item.templates.map((item2, index) => {
          const splittemplatearray = item2.Name.split('-');
          if (
            splittemplatearray[0] === process.env.REACT_APP_PROJECT &&
              splittemplatearray[1] === process.env.REACT_APP_TENANT &&
              splittemplatearray[2] === process.env.REACT_APP_ENV
          ) {
            templatesunfiltered.push(item2.Name);
            return (
              <option value={item2.Name} key={index}>
                {item2.Name}
              </option>
            );
          }
        }) :
        null,
    );

    initialValues.template_name = this.state.seltempdata.TemplateName;
    initialValues.subject = this.state.seltempdata.SubjectPart;
    initialValues.htmlbody = this.state.seltempdata.HtmlPart;

    return (
      <div className="animated fadeIn">
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground
        />
        <br />
        <br />
        <CRow>
          <CCol xs="6" sm="6" md="6">
            <CSelect onChange={this.updateSelection}>
              <option>Select a Template</option>
              {this.templates}
            </CSelect>
          </CCol>
          <CCol xs="6" sm="6" md="3">
            <CButton
              type="button"
              color="info"
              className="mr-1"
              onClick={(e) => this.getselectedtemplate()}
            >
              Get Template
            </CButton>
          </CCol>
          <CCol xs="1" sm="1" md="1">
            {this.state.isSelect ? (
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <></>
            )}
          </CCol>
        </CRow>

        <br />
        <br />
        <CRow>
          <CCol xs="12" sm="6" md="8">
            <CCard color="gradient-dark" className="text-white">
              <CCardHeader>Update Email Template</CCardHeader>
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
                    setTouched,
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
                            <CInput
                              type="text"
                              name="template_name"
                              id="template_name"
                              placeholder="Template Name"
                              autoComplete="given-name"
                              autoFocus
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.template_name || ''}
                              disabled
                            />
                            <CInvalidFeedback>
                              {errors.template_name}
                            </CInvalidFeedback>
                          </CFormGroup>

                          <CFormGroup>
                            <CLabel htmlFor="subject">Subject</CLabel>
                            <CInput
                              type="text"
                              name="subject"
                              id="subject"
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
                              id="htmlbody"
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
                                  {isSubmitting ? 'Wait...' : 'Update'}
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
            {/* </CCardBody>
                        </CCard> */}
          </CCol>
        </CRow>
      </div>
    );
  }
}
export default UpdateEmail;
