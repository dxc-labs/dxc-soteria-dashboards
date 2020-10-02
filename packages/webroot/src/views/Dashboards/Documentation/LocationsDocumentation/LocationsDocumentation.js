import React, {Component} from 'react';
import {
  CTooltip, CButton, CCard, CCardBody, CCardFooter, CCardHeader,
} from '@coreui/react';
import {CIcon} from '@coreui/icons-react';
import {Auth} from 'aws-amplify';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import ReactMarkdown from 'react-markdown';

class LocationsDocumentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Code editor
      readOnly: false,
      theme: 'eclipse',
      mode: 'markdown',
      code: '',
      value: '',
      outputText: '',
      Auth: '',
      iseditactive: false,
    };
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({
      value: this.state.code, Auth: user.signInUserSession.idToken.jwtToken,
    });

    const url = (`${process.env.REACT_APP_USER_DOMAIN}dashboards/documents/Locations-README.md`);
    await fetch(url)
        .then((res) => res.text())
        .then((md) => {
          this.setState({code: md, value: md});
        });

    if (this.state.iseditactive === true) {
      if (this.editor.editor.options.autofocus) {
        this.editor.editor.setSize('100%', '50vh');
        this.editor.editor.focus();
      }
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  updatefile() {
    this.setState({code: this.state.outputText});

    const postdata = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': this.state.Auth},
      body: JSON.stringify({data: this.state.outputText, file: 'Locations-README.md'}),

    };
    fetch(`${process.env.REACT_APP_API_DOMAIN}dashboards/updatefile`, postdata)
        .then((response) => response.json())
        .then((response) => {
          if (response.ResponseMetadata.HTTPStatusCode === 200) {
            this.setState({iseditactive: false});
          }
        });
  }

  preview() {
    this.setState({code: this.state.outputText});
  }

  editfile(option) {
    if (option === 'Edit') {
      this.setState({iseditactive: true});
    } else {
      this.setState({iseditactive: false});
    }
  }

  render() {
    if (window.sessionStorage.getItem('usertype') === 'User') {
      return (
        <CCard>
          <CCardHeader>
            File Preview
          </CCardHeader>
          <CCardBody>
            <ReactMarkdown source={this.state.code} />
          </CCardBody>
        </CCard>
      );
    }

    const options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode,
      theme: this.state.theme,
      autofocus: true,
    };

    // temp fix
    if (this.instance) {
      setTimeout(() => this.instance.refresh(), 200);
    }

    return (
      <div className="animated fadeIn">
        {this.state.iseditactive ? (
          <div>
            <CCard>
              <CCardHeader>
                File Editor - Markdown
                {' '}
                <div className="card-header-actions">
                  <CTooltip content="Close Editor">
                    <CIcon className="float-right mb-0" name="cil-x-circle" alt="Close" onClick={(e) => this.editfile('Back')} />
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
                    });
                  }}
                  editorDidMount={(editor) => {
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
            <CCard>
              <CCardHeader>
                File Preview
              </CCardHeader>
              <CCardBody>
                <ReactMarkdown source={this.state.code} />
              </CCardBody>
            </CCard>
          </div>
        ) :
          (
            <div>
              <CCard>
                <CCardHeader>
                  File Preview
                  <div className="card-header-actions">
                    <CTooltip content="Edit File">
                      <CIcon className="float-right mb-0" name="cil-pencil" alt="Edit" onClick={(e) => this.editfile('Edit')} />
                    </CTooltip>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <ReactMarkdown source={this.state.code} />
                </CCardBody>
              </CCard>
            </div>
          )}
      </div>
    );
  }

  toggleReadOnly() {
    this.setState({
      readOnly: !this.state.readOnly,
    }, () => {
      this.editor.editor.focus();
    });
  }
}

export default LocationsDocumentation;
