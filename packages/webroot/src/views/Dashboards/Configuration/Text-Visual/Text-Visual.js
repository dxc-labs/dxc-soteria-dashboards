import React, {Component} from 'react';
import {
  CCard, CCardBody, CButtonGroup, CCardHeader, CButton, CInput,
} from '@coreui/react';
import mermaid from 'mermaid';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import {CIcon} from '@coreui/icons-react';
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import {Base64} from 'js-base64';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Text_Visual extends Component {
  /**
* Debounce the code first. When the function
* fires, take the value and attempt to update
* the Mermaid chart.
*
* @memberof Mermaid
*/
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
      examplecode: '',
      encoded: '',

      iseditactive: false,
    };
  }

  handleChange(value) {
    const outputexamples = document.getElementById('outputexamples');
    try {
      // use the mermaid parse first to ensure code is parsable. If not, throw an
      // error, handle it gracefully and do nothing.
      mermaid.parse(value);
      outputexamples.innerHTML = '';
      mermaid.render('theGraph', value, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });
      this.setState({
        outputText: value,
      });

      const defaultState_1 = {
        code: value,
        mermaid: {theme: 'forest'},
      };

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } catch (err) {
      console.error(err);
    }
  }
  /**
   * Render an initial chart on mount.
   *
   * @memberof Mermaid
   */

  async componentDidMount() {
    const outputexamples = document.getElementById('outputexamples');
    mermaid.initialize({startOnLoad: true, theme: 'forest'});

    this.setState({
      value: this.state.code,
    });

    const example = `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }`;
    const defaultState_1 = {
      code: example,
      mermaid: {theme: 'forest'},
    };

    this.setState({examplecode: example});
    mermaid.render('theGraphexample', example, (svgCode) => {
      outputexamples.innerHTML = svgCode;
    });

    const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
    this.setState({encoded: basetrail});

    if (this.state.iseditactive === false) {
      if (this.editor.editor.options.autofocus) {
        this.editor.editor.setSize('100%', '50vh');
        this.editor.editor.focus();
      }
    }
  }

  getchart(option) {
    const outputexamples = document.getElementById('outputexamples');
    if (option === 'Flow Chart') {
      const example = `graph TD
      A[Christmas] -->|Get money| B(Go shopping)
      B --> C{Let me think}
      C -->|One| D[Laptop]
      C -->|Two| E[iPhone]
      C -->|Three| F[fa:fa-car Car]`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'Sequence Diagram') {
      const example = `sequenceDiagram
      Alice->>+John: Hello John, how are you?
      Alice->>+John: John, can you hear me?
      John-->>-Alice: Hi Alice, I can hear you!
      John-->>-Alice: I feel great!`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'Class Diagram') {
      const example = `classDiagram
      Animal <|-- Duck
      Animal <|-- Fish
      Animal <|-- Zebra
      Animal : +int age
      Animal : +String gender
      Animal: +isMammal()
      Animal: +mate()
      class Duck{
        +String beakColor
        +swim()
        +quack()
      }
      class Fish{
        -int sizeInFeet
        -canEat()
      }
      class Zebra{
        +bool is_wild
        +run()
      }`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'State Diagram') {
      const example = `stateDiagram
      [*] --> Still
      Still --> [*]
    
      Still --> Moving
      Moving --> Still
      Moving --> Crash
      Crash --> [*]`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'Gantt Chart') {
      const example = `gantt
      title A Gantt Diagram
      dateFormat  YYYY-MM-DD
      section Section
      A task           :a1, 2014-01-01, 30d
      Another task     :after a1  , 20d
      section Another
      Task in sec      :2014-01-12  , 12d
      another task      : 24d`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'Pie Chart') {
      const example = `pie title Pets adopted by volunteers
      "Dogs" : 386
      "Cats" : 85
      "Rats" : 15`;

      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'ER Diagram') {
      const example = `erDiagram
      CUSTOMER }|..|{ DELIVERY-ADDRESS : has
      CUSTOMER ||--o{ ORDER : places
      CUSTOMER ||--o{ INVOICE : "liable for"
      DELIVERY-ADDRESS ||--o{ ORDER : receives
      INVOICE ||--|{ ORDER : covers
      ORDER ||--|{ ORDER-ITEM : includes
      PRODUCT-CATEGORY ||--|{ PRODUCT : contains
      PRODUCT ||--o{ ORDER-ITEM : "ordered in"`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    } else if (option === 'Journey') {
      const example = `journey
      title My working day
      section Go to work
        Make tea: 5: Me
        Go upstairs: 3: Me
        Do work: 1: Me, Cat
      section Go home
        Go downstairs: 5: Me
        Sit down: 5: Me`;
      const defaultState_1 = {
        code: example,
        mermaid: {theme: 'forest'},
      };

      this.setState({examplecode: example});
      mermaid.render('theGraphexample', example, (svgCode) => {
        outputexamples.innerHTML = svgCode;
      });

      const basetrail = `${Base64.encodeURI(JSON.stringify(defaultState_1))}`;
      this.setState({encoded: basetrail});
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    if (window.sessionStorage.getItem('usertype') === 'User') {
      return (
        <CCard>
          <CCardHeader>
            File Preview
          </CCardHeader>
          <CCardBody>
            <div align="center" id="output" />
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
        <CCard>
          <CCardHeader>
            Text to Visuals
          </CCardHeader>
          <CCardBody>
            <CButtonGroup>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('Flow Chart')}>Flow Chart</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('Sequence Diagram')}>Sequence Diagram</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('Class Diagram')}>Class Diagram</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('State Diagram')}>State Diagram</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('Gantt Chart')}>Gantt Chart</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('Pie Chart')}>Pie Chart</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('ER Diagram')}>ER Diagram</CButton>
              <CButton type="button" color="info" className="mr-1" onClick={(e) => this.getchart('Journey')}>Journey</CButton>
            </CButtonGroup>
            <br />
            <br />
            <br />
            <table width="100%">
              <tbody>
                <tr>
                  <td width="30%" valign="top">
                    Code Editor
                    <br />
                    <CodeMirror
                      ref={(node) => this.editor = node}
                      value={this.state.examplecode}
                      options={options}
                      onChange={(editor, metadata, value) => this.handleChange(value)}
                      editorDidMount={(editor) => {
                        // temp fix
                        this.instance = editor;
                      }}
                    />
                    <br />
                    Encoded URL
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <CInput
                              type="text"
                              name="template_name"
                              id="template_name"
                              placeholder="Encoded code"
                              autoComplete="given-name"
                              autoFocus
                              defaultValue={this.state.encoded}
                            />
                          </td>
                          <td>
                            <CopyToClipboard text={`[![](https://mermaid.ink/img/${this.state.encoded})`}>
                              <CIcon name="cil-copy" height={20} width={20} />
                            </CopyToClipboard>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td width="70%" align="center" valign="top">
                    Preview
                    <br />
                    <div id="outputexamples" />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </CCardBody>
        </CCard>
      </div>
    );
  }
}
export default Text_Visual;
