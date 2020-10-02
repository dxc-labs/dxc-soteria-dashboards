import React from 'react';
import {
  CButton,
  CSelect,
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
  CTabs,
  CNavItem,
  CNavLink,
  CNav,
  CTabContent,
  CTabPane,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
} from '@coreui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './ValidationForms.css';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';
import { Auth } from 'aws-amplify';
import UpdateEmail from './UpdateEmail';
import CreateTemplate from './CreateTemplate';
import { flagSet } from '@coreui/icons';
import FileBase64 from 'react-file-base64';

const validationSchema = function(values) {
  return Yup.object().shape({
    template_name: Yup.string()
      .min(2, 'Template Name is mandatory')
      .required('Template Name is required'),
    data: Yup.string().required('Body is required'),
    subject: Yup.string().required('Subject is required'),
    sendto: Yup.string()
      .min(2, 'Email is mandatory')
      .required('Email is required'),
    sentfrom: Yup.string().required('Email is required'),
  });
};

const validate = (getValidationSchema) => (values) => {
  const validationSchema = getValidationSchema(values);
  try {
    validationSchema.validateSync(values, { abortEarly: false });
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

const sentfromemail = process.env.REACT_APP_USER_DOMAIN.split('/');
const initialValues = {
  template_name: '',
  sentfrom: 'notifications',
  data: '',
  subject: '',
  sendto: [],
};

var Isattached = false;
var selectedattachment = [];

const onSubmit = async (values, { setSubmitting, setErrors }) => {
  const user = await Auth.currentAuthenticatedUser();

  const userlistemail = [];
  const splitfunc = values.sendto.split(',');
  for (let i = 0; i < splitfunc.length; i++) {
    userlistemail.push(splitfunc[i]);
  }

  if (Isattached === false) {
    if (values.data.indexOf('{') === -1 || values.subject.indexOf('{') === -1) {
      const postdata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.signInUserSession.idToken.jwtToken,
        },
        body: JSON.stringify({
          template_name: values.template_name,
          sentfrom: `${values.sentfrom}@${sentfromemail[2]}`,
          data: values.data,
          subject: values.subject,
          sendto: userlistemail,
        }),
      };
      fetch(
        `${process.env.REACT_APP_API_DOMAIN}dashboards/sendtemplatemail`,
        postdata,
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.Status === 'Success') {
            setSubmitting(false);
            Isattached = false;
            ToastsStore.success('Email successfully sent!');
          } else {
            Isattached = false;
          }
        });
    } else {
      const postdata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.signInUserSession.idToken.jwtToken,
        },
        body: JSON.stringify({
          template_name: values.template_name,
          sentfrom: `${values.sentfrom}@${sentfromemail[2]}`,
          data: JSON.parse(values.data),
          sendto: userlistemail,
        }),
      };
      fetch(
        `${process.env.REACT_APP_API_DOMAIN}dashboards/sendtemplatemail`,
        postdata,
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.Status === 'Success') {
            setSubmitting(false);
            Isattached = false;
            ToastsStore.success('Email successfully sent!');
          } else {
            Isattached = false;
          }
        });
    }
  } else if (Isattached === true) {
    var region = process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID.split('_');
    const body = {
      region: region[0],
      to: userlistemail,
      subject: values.subject,
      text: values.data,
      from: `${values.sentfrom}@${sentfromemail[2]}`,
      attachments: [
        {
          path: selectedattachment.base64,
        },
      ],
    };

    const postdata1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.signInUserSession.idToken.jwtToken,
      },
      body: JSON.stringify(body),
    };
    fetch(
      `${process.env.REACT_APP_API_DOMAIN}` + 'dashboards/sendsesattachment',
      postdata1,
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.message === 'Email Sent') {
          Isattached = false;
          setSubmitting(false);
          ToastsStore.success('Email successfully sent!');
          selectedattachment = [];
        } else {
          Isattached = false;
          setSubmitting(false);
          ToastsStore.success('Email Failure!');
          selectedattachment = [];
        }
      });
  }
};

class EmailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.touchAll = this.touchAll.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.state = {
      templatedata: [],
      seltempdata: [],
      selectitem: '',
      isSelect: false,
      Auth: '',
      files: [],
      Isattachmentflag: false,
    };
  }

  getFiles(files) {
    this.setState({ files: files });
    if (files.length != 0) {
      Isattached = true;
      selectedattachment = files[0];
    } else {
      Isattached = false;
      selectedattachment = [];
    }
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

  updateSelection(evt) {
    this.setState({ selectitem: evt.target.value });
  }

  touchAll(setTouched, errors) {
    setTouched({
      sentfrom: true,
      sendto: true,
      data: true,
      template_name: true,
    });
    this.validateForm(errors);
  }

  getselectedtemplate() {
    this.setState({ isSelect: true });
    if (this.state.selectitem === '') {
      ToastsStore.warning('Please select a template from the dropdown!');
      this.setState({ isSelect: false });
    } else if (this.state.selectitem === 'default') {
      ToastsStore.warning('Please select a template from the dropdown!');
      this.setState({ isSelect: false });
    } else {
      const postdata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.Auth,
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
        .then((response) => this.setState({ seltempdata: response }))
        .then((response) => {
          if (this.state.seltempdata.HtmlPart.indexOf('{{') === -1) {
            this.setState({ Isattachmentflag: false });
          } else {
            this.setState({ Isattachmentflag: true });
          }
        })

        .then(ToastsStore.success('Successfully loaded the template!'));
      this.setState({ isSelect: false });
    }
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({ Auth: user.signInUserSession.idToken.jwtToken });
    this.region = process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID.split(
      '_',
    );
    const postdata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.state.Auth,
      },
      body: JSON.stringify({ region: this.region[0] }),
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}dashboards/getsestemplates`,
      postdata,
    )
      .then((response) => response.json())
      .then((response) => this.setState({ templatedata: response }));
  }

  render() {
    initialValues.template_name = this.state.seltempdata.TemplateName;
    initialValues.data = this.state.seltempdata.HtmlPart;
    initialValues.subject = this.state.seltempdata.SubjectPart;

    const templatesunfiltered = [];
    this.templates = this.state.templatedata.map((item, index) =>
      typeof item.templates === 'object'
        ? item.templates.map((item2, index) => {
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
          })
        : null,
    );

    return (
      <div className="animated fadeIn">
        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground
        />
        <CCard>
          <CCardHeader>Notifications</CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Create Template</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Update Template</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Send Notification</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>API Info</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <CreateTemplate />
                </CTabPane>
                <CTabPane>
                  <UpdateEmail />
                </CTabPane>
                <CTabPane>
                  <br />
                  <br />
                  <CRow>
                    <CCol xs="6" sm="6" md="6">
                      <CSelect onChange={this.updateSelection}>
                        <option value="default">Select a Template</option>
                        {this.templates}
                      </CSelect>
                    </CCol>
                    <CCol xs="6" sm="6" md="3">
                      <CButton
                        type="button"
                        color="info"
                        className="mr-1"
                        onClick={(e) => this.getselectedtemplate()}>
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
                  <CRow>
                    <CCol xs="12" sm="12" md="12">
                      <CCard color="gradient-dark" className="text-white">
                        <CCardHeader>Send Email</CCardHeader>
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
                                    name="simpleForm">
                                    <CFormGroup>
                                      <CLabel htmlFor="template_name">
                                        Template Name
                                      </CLabel>
                                      <CInput
                                        type="text"
                                        name="template_name"
                                        id="template_name_send"
                                        placeholder="Template Name"
                                        autoComplete="given-name"
                                        autoFocus
                                        required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.template_name}
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
                                        id="subhect"
                                        placeholder="Subject"
                                        autoComplete="given-name"
                                        valid={!errors.subject}
                                        invalid={
                                          touched.subject && !!errors.subject
                                        }
                                        autoFocus
                                        required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.subject}
                                        disabled
                                      />
                                      <CInvalidFeedback>
                                        {errors.subject}
                                      </CInvalidFeedback>
                                    </CFormGroup>
                                    <CFormGroup>
                                      <CLabel htmlFor="data">
                                        Body (For templates with Dynamic
                                        variables pass only the key value pair.
                                        Eg:
                                        <b>{'{"name":"abc"}'}</b>)
                                      </CLabel>
                                      <CInput
                                        type="text"
                                        name="data"
                                        id="data"
                                        placeholder="Body"
                                        autoComplete="given-name"
                                        valid={!errors.data}
                                        invalid={touched.data && !!errors.data}
                                        autoFocus
                                        required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.data}
                                      />
                                      <CInvalidFeedback>
                                        {errors.data}
                                      </CInvalidFeedback>
                                    </CFormGroup>
                                    <CFormGroup>
                                      <CLabel htmlFor="sentfrom">
                                        Sent From
                                      </CLabel>
                                      <CRow>
                                        <CCol xs="12" sm="12" md="12">
                                          <CInputGroup className="input-prepend">
                                            <CInput
                                              type="text"
                                              name="sentfrom"
                                              id="sentfrom"
                                              placeholder="Sent From"
                                              autoComplete="sentfrom"
                                              valid={!errors.sentfrom}
                                              invalid={
                                                touched.sentfrom &&
                                                !!errors.sentfrom
                                              }
                                              autoFocus
                                              required
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.sentfrom}
                                            />
                                            <CInvalidFeedback>
                                              {errors.sentfrom}
                                            </CInvalidFeedback>
                                            <CInputGroupText>
                                              @{`${sentfromemail[2]}`}
                                            </CInputGroupText>
                                            <CInvalidFeedback>
                                              {errors.sentfrom}
                                            </CInvalidFeedback>
                                          </CInputGroup>
                                        </CCol>
                                      </CRow>
                                    </CFormGroup>
                                    <CFormGroup>
                                      <CLabel htmlFor="data">
                                        Add Recipient(s) (separated by , )
                                      </CLabel>
                                      <CInput
                                        type="text"
                                        name="sendto"
                                        id="sendto"
                                        autoFocus
                                        valid={!errors.sendto}
                                        invalid={
                                          touched.sendto && !!errors.sendto
                                        }
                                        required
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Recipient Email Id"
                                        autoComplete="Recipients"
                                        required
                                      />
                                      <CInvalidFeedback>
                                        {errors.sendto}
                                      </CInvalidFeedback>
                                    </CFormGroup>

                                    {this.state.Isattachmentflag ? (
                                      <></>
                                    ) : (
                                      <CFormGroup>
                                        <FileBase64
                                          multiple={true}
                                          onDone={this.getFiles.bind(this)}
                                        />
                                      </CFormGroup>
                                    )}

                                    <CFormGroup>
                                      <CRow>
                                        <CCol xs="1" sm="1" md="12">
                                          <CButton
                                            type="submit"
                                            color="success"
                                            className="mr-1"
                                            disabled={isSubmitting || !isValid}>
                                            {isSubmitting
                                              ? 'Sending...'
                                              : 'Send'}
                                          </CButton>
                                          <CButton
                                            type="reset"
                                            color="danger"
                                            className="mr-1"
                                            onClick={handleReset}>
                                            Reset
                                          </CButton>

                                          {isSubmitting ? (
                                            <div
                                              className="spinner-border text-info"
                                              role="status">
                                              <span className="sr-only">
                                                Loading...
                                              </span>
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
                  </CRow>
                </CTabPane>
                <CTabPane>
                  <br />
                  <h3>API INFO</h3>
                  <br />
                  <CRow>
                    <CCol xs="6" sm="6" md="12">
                      <CCard color="gradient-dark">
                        <CCardHeader>
                          <b>Send SES Email</b>
                        </CCardHeader>
                        <CCardBody>
                          <li>API: /dashboards/ext/sendtemplatemail</li>
                          <li>
                            BODY:
                            {
                              '{ "template_name": "", "sentfrom"": "", "subject": "", "data": "", "sendto": "["email_id"]" }'
                            }
                          </li>
                          <br />
                          <li>
                            EXAMPLE:
                            {
                              ' {"template_name": "Test-for-integration","sentfrom": "name@domainname.com","subject":"sample_subject", "data": "sample_data","sendto": ["abc@xyz.com","def@xyz.com"]}'
                            }
                          </li>
                        </CCardBody>
                        <CCardHeader>
                          <b>Send SES Email with attachment</b>
                        </CCardHeader>
                        <CCardBody>
                          <li>API: /dashboards/ext/sendsesattachment</li>
                          <li>
                            BODY:
                            {
                              '{"region":"xx-xxx","to":["email id(comma separated)"],"subject":"Test Subject","text":"Test Body","from":"emailid","attachments":[{"path":"data:text/plain;base64,c2Zkc2Zkc2Zkc2Y="}]}'
                            }
                          </li>
                          <br />
                          <li>
                            EXAMPLE:
                            {
                              '{"region":"xx-xxx","to":["abc@abc.com"],"subject":"Test Subject","text":"Test Body","from":"xxxx@abc.com","attachments":[{"path":"data:text/plain;base64,c2Zkc2Zkc2Zkc2Y="}]}'
                            }
                          </li>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}
export default EmailTemplate;
