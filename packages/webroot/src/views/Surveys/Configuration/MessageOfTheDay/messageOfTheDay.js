import React, { Component } from 'react';
import { CTooltip, CButton, CCard, CCardBody, CCardFooter, CCardHeader } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { Auth } from 'aws-amplify';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import ReactMarkdown from 'react-markdown'
import { any } from 'prop-types';
import * as HttpStatus from 'http-status-codes'
import { getStatusCode } from 'http-status-codes'

const axios = require('axios');

class MessageOfTheDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Code editor
      readOnly: false,
      theme: 'eclipse',
      mode: 'markdown',
      code: '',
      value: '',
      outputText: '',
      Auth: '',
      statusCode: null,
      iseditactive: false,
      markdown: ''
    };
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({
      value: this.state.code, Auth: user.signInUserSession.idToken.jwtToken
    });

    const customURL = (process.env.REACT_APP_USER_DOMAIN + 'runtime/surveys/custom/messageOfTheDay.md')
    const standardURL = (process.env.REACT_APP_USER_DOMAIN + 'runtime/surveys/standard/messageOfTheDay.md')

    const apiParams = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth }
    }
    try {
      let response = await axios.get(process.env.REACT_APP_API_DOMAIN + 'surveys/admin/isMessageOfTheDayCustom', apiParams)
      let fetchURL = response.data.isCustom ? customURL : standardURL;
      await fetch(fetchURL)
        .then((response) => response.text())
        .then(md => {
          this.setState({ code: md, value: md })
        })
    } catch (error) {
      if (error.response && error.response.hasOwnProperty("status")) {
        this.setState({ statusCode: error.response.status });
        ToastsStore.error('Internal Server Error');
      } else {
        this.setState({ statusCode: getStatusCode('Internal Server Error') });
        ToastsStore.error('Internal Server Error');
      }
    }


    if (this.state.iseditactive === true) {
      if (this.editor.editor.options.autofocus) {
        this.editor.editor.setSize('100%', '50vh')
        this.editor.editor.focus();
      }
    }
  }



  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  async updatefile() {
    this.setState({ code: this.state.outputText })
    const postdata = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': this.state.Auth },
      body: JSON.stringify({ data: this.state.outputText })
    }
    try {
      let response = await fetch(process.env.REACT_APP_API_DOMAIN + 'surveys/admin/messageOfTheDay', postdata)
      this.setState({ iseditactive: false, statusCode: response.status })

    } catch (error) {
      if (error.response && error.response.hasOwnProperty("status")) {
        this.setState({ statusCode: error.response.status });
      } else {
        ToastsStore.error('Internal Server Error');
        this.setState({ statusCode: getStatusCode('Internal Server Error') });
      }
    }
  }

  preview() {
    this.setState({ code: this.state.outputText })
  }

  editfile(option) {
    if (option === 'Edit') {
      this.setState({ iseditactive: true })
    }
    else
      this.setState({ iseditactive: false })
  }

  render() {
    const options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode,
      theme: this.state.theme,
      autofocus: true
    }

    // temp fix
    if (this.instance) {
      setTimeout(() => this.instance.refresh(), 200);
    }

    return (
      <div className="animated fadeIn">
        <div>
          <CCard>
            <CCardBody>
              <h5>Configure Message of the day that is shown upon successful submission of the survey.  Useful to convey current safety measures.</h5>
            </CCardBody>
          </CCard>
        </div>

        <ToastsContainer
          position={ToastsContainerPosition.TOP_CENTER}
          store={ToastsStore}
          lightBackground
        />

        {this.state.iseditactive ? (
          <div>
            <CCard>
              <CCardHeader>
                File Editor - Markdown{' '}
                <div className="card-header-actions">
                  <CTooltip content="Close Editor">
                    <CIcon className={'float-right mb-0'} name="cil-x-circle" alt="Close" onClick={(e) => this.editfile("Back")} />
                  </CTooltip>
                </div>
              </CCardHeader>
              <CCardBody>
                <CodeMirror
                  ref={(node) => this.editor = node}
                  value={this.state.code}
                  options={options}
                  // onBeforeChange={(editor, data, value) => { this.setState({ value }); }}
                  onChange={(editor, metadata, value) => {
                    this.setState({
                      outputText: value,
                    })
                  }}
                  editorDidMount={editor => {
                    // temp fix
                    this.instance = editor;
                  }}
                />
              </CCardBody>
              <CCardFooter>
                <CButton type="button" color="success" className="mr-1" onClick={(e) => this.updatefile()}>Update File </CButton>
                <CButton type="button" color="info" className="mr-1" onClick={(e) => this.preview()}>Preview File </CButton>
              </CCardFooter>
            </CCard>
            < CCard >
              <CCardHeader>
                File Preview
            </CCardHeader>
              <CCardBody>
                <ReactMarkdown source={this.state.code} />
              </CCardBody>
            </CCard >
          </div>
        ) : (
            <div>
              < CCard >
                <CCardHeader>
                  File Preview
                  <div className="card-header-actions">
                    <CTooltip content="Edit File">
                      <CIcon className={'float-right mb-0'} name="cil-pencil" alt="Edit" onClick={(e) => this.editfile("Edit")} />
                    </CTooltip>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <ReactMarkdown source={this.state.code} />
                </CCardBody>
              </CCard >
            </div>
          )}
      </div>
    );
  }

  toggleReadOnly() {
    this.setState({
      readOnly: !this.state.readOnly
    }, () => { this.editor.editor.focus() })
  }
}

export default MessageOfTheDay;
