import React from 'react';

//Auth components
const Signin = React.lazy(() => import('./views/Signin'));
const Signup = React.lazy(() => import('./views/Signup'));

//Default
const ErrorPage = React.lazy(() => import('./views/ErrorPage'));
const Homepage = React.lazy(() => import('./views/Homepage'));

//Dashboards
const TracingLocationDB = React.lazy(() => import('./views/Tracing/Dashboard/LocationTracing'));

//Admin
const EmailTemplate = React.lazy(() => import('./views/Dashboards/Configuration/EmailTemplate'));
const Text_Visual = React.lazy(() => import('./views/Dashboards/Configuration/Text-Visual'));
const TracingQRCodeGen = React.lazy(() => import('./views/Tracing/Configuration/QRCodeGen'));
const TracingBulkLocationUpload = React.lazy(() => import('./views/Tracing/Configuration/BulkLocation'));
const TracingLocationEdit = React.lazy(() => import('./views/Tracing/Configuration/Locations'));
const Surveys = React.lazy(() => import('./views/Surveys/Configuration/ManageSurveys'));
const SurveysMOTD = React.lazy(() => import('./views/Surveys/Configuration/MessageOfTheDay'));
const CheckpointsGatekeeperQR = React.lazy(() => import('./views/Checkpoints/Configuration/CheckpointsQR'));
const CheckpointsVisitorNotice = React.lazy(() => import('./views/Checkpoints/Configuration/VisitorNotice'));

//Root
const Cognito = React.lazy(() => import('./views/Cognito'));

//Documentation
const QuickstartDocumentation = React.lazy(() => import('./views/Dashboards/Documentation/QuickstartDocumentation/QuickstartDocumentation'));
const CheckpointsDocumentation = React.lazy(() => import('./views/Dashboards/Documentation/CheckpointsDocumentation'));
const FacilityDocumentation = React.lazy(() => import('./views/Dashboards/Documentation/FacilityDocumentation'));
const LocationsDocumentation = React.lazy(() => import('./views/Dashboards/Documentation/LocationsDocumentation'));
const SurveysDocumentation = React.lazy(() => import('./views/Dashboards/Documentation/SurveysDocumentation'));
const TracingDocumentation = React.lazy(() => import('./views/Dashboards/Documentation/TracingDocumentation'));

export const userroutes = [

  { path: '/dashboards/signin', name: 'Signin', component: Signin },
  { path: '/dashboards/signup', name: 'Signup', component: Signup },

  //Default page
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboards/errorpage', name: 'Error Page', component: ErrorPage },
  { path: '/dashboards/homepage', name: 'Home', component: Homepage },

  //Documentation Module
  { path: '/dashboards/quickstartdocumentation', name: 'Documentation / Quickstart', component: QuickstartDocumentation },
  { path: '/dashboards/checkpointsdocumentation', name: 'Documentation / Checkpoints', component: CheckpointsDocumentation },
  { path: '/dashboards/facilitydocumentation', name: 'Documentation / Facility', component: FacilityDocumentation },
  { path: '/dashboards/locationsdocumentation', name: 'Documentation / Locations', component: LocationsDocumentation },
  { path: '/dashboards/surveysdocumentation', name: 'Documentation / Surveys', component: SurveysDocumentation },
  { path: '/dashboards/tracingdocumentation', name: 'Documentation / Tracing', component: TracingDocumentation }
];

export const adminroutes = [

  { path: '/dashboards/signin', name: 'Signin', component: Signin },
  { path: '/dashboards/signup', name: 'Signup', component: Signup },

  //Default page
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboards/errorpage', name: 'Error Page', component: ErrorPage },
  { path: '/dashboards/homepage', name: 'Home', component: Homepage },

  //Dashboards
  { path: '/dashboards/tracing-LocationsTracing', name: 'Dashboards / Location Tracing', component: TracingLocationDB }, 

  //Admin Modules
  { path: '/dashboards/emailtemplate', name: 'Configuration / Email Template', component: EmailTemplate },
  { path: '/dashboards/texttovisual', name: 'Documentation / Text - Visual', component: Text_Visual },
  { path: '/dashboards/tracing-QRCodeGen', name: 'Configuration / QR CodeGen', component: TracingQRCodeGen }, 
  { path: '/dashboards/tracing-BulkLocationUpload', name: 'Configuration / Location Upload', component: TracingBulkLocationUpload }, 
  { path: '/dashboards/tracing-Locations', name: 'Configuration / Locations', component: TracingLocationEdit},
  { path: '/dashboards/Surveys', name: 'Configuration / Manage Surveys', component: Surveys },
  { path: '/dashboards/Surveys-MOTD', name: 'Configuration / Message Of The Day', component: SurveysMOTD},
  { path: '/dashboards/checkpoints-gatekeeperqr', name: 'Configuration / Checkpoints / Gatekeeper QR', component: CheckpointsGatekeeperQR },
  { path: '/dashboards/checkpoints-visitornotice', name: 'Configuration / Checkpoints / Visitor Notice', component: CheckpointsVisitorNotice },

  //Documentation Module
  { path: '/dashboards/quickstartdocumentation', name: 'Documentation / Quickstart', component: QuickstartDocumentation },
  { path: '/dashboards/checkpointsdocumentation', name: 'Documentation / Checkpoints', component: CheckpointsDocumentation },
  { path: '/dashboards/facilitydocumentation', name: 'Documentation / Facility', component: FacilityDocumentation },
  { path: '/dashboards/locationsdocumentation', name: 'Documentation / Locations', component: LocationsDocumentation },
  { path: '/dashboards/surveysdocumentation', name: 'Documentation / Surveys', component: SurveysDocumentation },
  { path: '/dashboards/tracingdocumentation', name: 'Documentation / Tracing', component: TracingDocumentation }
];

export const rootroutes = [

  { path: '/dashboards/signin', name: 'Signin', component: Signin },
  { path: '/dashboards/signup', name: 'Signup', component: Signup },

  //Default page
  { path: '/login', exact: true, name: 'Home' },
  { path: '/dashboards/errorpage', name: 'Error Page', component: ErrorPage },
  { path: '/dashboards/homepage', name: 'Home', component: Homepage },

  //Root Modules
  { path: '/dashboards/userpermission', name: 'User Permissions', component: Cognito },

  //Dashboards
  { path: '/dashboards/tracing-LocationsTracing', name: 'Dashboards / Location Tracing', component: TracingLocationDB }, 

  //Admin Modules
  { path: '/dashboards/emailtemplate', name: 'Configuration / Email Template', component: EmailTemplate },
  { path: '/dashboards/texttovisual', name: 'Documentation / Text - Visual', component: Text_Visual },
  { path: '/dashboards/tracing-QRCodeGen', name: 'Configuration / QR CodeGen', component: TracingQRCodeGen }, 
  { path: '/dashboards/tracing-BulkLocationUpload', name: 'Configuration / Location Upload', component: TracingBulkLocationUpload }, 
  { path: '/dashboards/tracing-Locations', name: 'Configuration / Locations', component: TracingLocationEdit},
  { path: '/dashboards/Surveys', name: 'Configuration / Manage Surveys', component: Surveys },
  { path: '/dashboards/Surveys-MOTD', name: 'Configuration / Message Of The Day', component: SurveysMOTD},
  { path: '/dashboards/checkpoints-gatekeeperqr', name: 'Configuration / Checkpoints / Gatekeeper QR', component: CheckpointsGatekeeperQR },
  { path: '/dashboards/checkpoints-visitornotice', name: 'Configuration / Checkpoints / Visitor Notice', component: CheckpointsVisitorNotice },

  //Documentation Module
  { path: '/dashboards/quickstartdocumentation', name: 'Documentation / Quickstart', component: QuickstartDocumentation },
  { path: '/dashboards/checkpointsdocumentation', name: 'Documentation / Checkpoints', component: CheckpointsDocumentation },
  { path: '/dashboards/facilitydocumentation', name: 'Documentation / Facility', component: FacilityDocumentation },
  { path: '/dashboards/locationsdocumentation', name: 'Documentation / Locations', component: LocationsDocumentation },
  { path: '/dashboards/surveysdocumentation', name: 'Documentation / Surveys', component: SurveysDocumentation },
  { path: '/dashboards/tracingdocumentation', name: 'Documentation / Tracing', component: TracingDocumentation }
];