// import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { freeSet, flagSet, brandSet } from '@coreui/icons';
import { logo } from './assets/icons/logo'
import App from './App';

React.icons = { ...freeSet, ...flagSet, ...brandSet, logo }
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();