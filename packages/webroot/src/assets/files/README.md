## QuickStart Guide for adding your Administaration/ Dashboard screens into the CoreUI Pro v3 React Template

## Table of Contents

* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Basic usage](#Basic-usage)
* [Pushing your changes into GitHub](#Pushing-your-changes-into-GitHub)
* [What's included](#whats-included)
* [Using Predefined menus for Dashboard](#Using-Predefined-menus-for-Dashboard)
* [Using Predefined menus for Administration](#Using-Predefined-menus-for-Administration)
* [Rename predefined modules and menu](#Rename-predefined-modules-and-menu)
* [Create New Dashboard](#Create-New-Dashboard)
* [Create New Administration](#Create-New-Administration)
* [Reference Links](#Reference-Links)


## Prerequisites

Nodejs – (https://nodejs.org/en/download/)   
Or   
Yarn – (https://classic.yarnpkg.com/en/docs/install/)   


## Installation

### Clone repo

``` bash
# clone the repo
$ git clone git@github.dxc.com:safety-suite/dashboards.git

# go into app's directory
$ cd dashboards/web

# install app's dependencies
$ npm install (or) yarn install
```

### Basic usage

``` bash
# dev server  with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

## Pushing your changes into GitHub

1.	Make a feature branch from master (Prefix/Suffix with your team name), make your changes, commit & raise a pull request to merge with master branch. 
2.	Create a CFT (template.yaml and openapi.yaml) to deploy the services associated with the dashboard, administration screens.

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
CoreUI-React#v2.0.0
├── public/          #static files
│   ├── assets/      #assets
│   └── index.html   #html template
│
├── src/             #project root
│   ├── containers/  #container source
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── _nav.js      #sidebar config
│   └── routes.js    #routes config
│
└── package.json
```

## Using Predefined menus for Dashboard

### Steps to add your code into the pre-defined dashboard/menu – (Example: Contact Tracing Dashboard)
1.	Navigate to the pre-defined module under ‘./src/views/ Contact_tracing_dashboard’
2.	Update Contact_tracing_dashboard.js file with your code, retaining the default page layout.
3.	Installing additional Dependencies – Execute the below command at the root level ‘./dashboads/web’

```bash
        npm install --save <dependency_name> or yarn add < dependency_name>
```

  a)	Importing the installed Dependencies – You have to import the dependency in yours Contact_tracing_dashboard.js file.

```bash
       import { Component } from '<dependency_name> ';
```

4.	Create a folder in ‘./dashboards/web/src/assets/img’ folder with your team name(Contact_tracing_dashboard) and place images and similarly create another folder in ‘./dashboards/web/src/assets/css’ folder with your team name(Contact_tracing_dashboard) and place css files.

    a)	Referring images and css in the Contact_tracing_dashboard.js file  - Import the file right in a JavaScript module from the ‘./dashboards/web/src/assets/img/ Contact_tracing_dashboard’ directory.

```bash
import logo from './assets/img/Contact_tracing_dashboard /logo.png';   
import <stylename> from './assets/css/Contact_tracing_dashboard /<selectbox>.css;    

function Header() {   
    // Import result is the URL of your image   
    return <img src={logo} alt="Logo" />;   
}   
```
5.	Make use of environment variables for defining your configurational parameters like API path.   
    a.	Declare the env variable in the ‘./dashboards/web/.env’ file.   
    b.	Make sure that the variable is prefixed with `REACT_APP_`.   
    c.  Refer the env variable in your component (Contact_tracing_dashboard.js).  

```   
REACT_APP_API_CONTACT_TRACING_DASHBOARD_GETCOUNTRYDATA=https://abc.com/dev/   
```

```
(process.env. REACT_APP_API_CONTACT_TRACING_DASHBOARD_GETCOUNTRYDATA)   
```   
#### Note: Follow the env variable naming convention – REACT_APP_TEAMNAME_VARIABLENAME   


## Using Predefined menus for Administration

### Steps to add your code into the pre-defined Administration Page/menu – (Example: Contact Tracing Admin)
1.	Navigate to the pre-defined module under ‘./src/views/ Contact_tracing_admin’
2.	Update Contact_tracing_admin.js file with your code, retaining the default page layout.
3.	Installing additional Dependencies – Execute the below command at the root level ‘./dashboards/web’

```bash
        npm install --save <dependency_name> or yarn add < dependency_name>
```

  a)	Importing the installed Dependencies – You have to import the dependency in yours Contact_tracing_admin.js file.

```bash
       import { Component } from '<dependency_name> ';
```

4.	Create a folder in ‘./dashboards/web/src/assets/img’ folder with your team name(Contact_tracing_admin) and place images and similarly create another folder in ‘./dashboards/web/src/assets/css’ folder with your team name(Contact_tracing_admin) and place css files.

    a)	Referring images and css in the Contact_tracing_admin.js file  - You can import a file right in a JavaScript module from the ‘./dashboards/web/src/assets/img/ Contact_tracing_admin’ directory.

```bash
import logo from './assets/img/Contact_tracing_admin /logo.png'; 
import <stylename> from './assets/css/Contact_tracing_admin /<selectbox>.css; 

function Header() {
    // Import result is the URL of your image
    return <img src={logo} alt="Logo" />;
}
```

5.	Make use of environment variables for defining your configurational parameters like API path.

    a.	Declare the env variable in the ‘./dashboards/web/.env’ file.   
    b.	Make sure that the variable is prefixed with `REACT_APP_`.   
    c.	Refer the env variable in your component (Contact_tracing_admin.js).   

```bash
REACT_APP_API_CONTACT_TRACING+ADMIN_GETCOUNTRYDATA=https://abc.com/dev/
```

```bash
(process.env. REACT_APP_API_CONTACT_TRACING_ADMIN_GETCOUNTRYDATA)
```
#### Note: Follow the env variable naming convention – REACT_APP_TEAMNAME_VARIABLENAME


## Rename predefined modules and menu

### Steps to rename the pre-defined module name and sidebar/menu bar – (Example: Contact Tracing Admin)
1.	Change the Module name from contact_tracing_admin to Tracing_admin.
2.	Rename the folder name ‘./dashboards/web/src/views/Contact_tracing_admin’ to ‘./dashboards/web/src/views/Tracing_admin’
3.	Rename the file ‘./dashboards/web/src/views/Tracing_admin /Contact_tracing_admin.js’ to Tracing.js_admin.
4.	In the package.json in ./dashboards/web/src/views/Tracing_admin update the main entry point from ./Contact_tracing_admin.js to ./Tracing_admin.js.
5.	In the ‘./dashboards/web/src/routes.js’ update from 

```bash
const ContactTracingAdmin = React.lazy(() => import('./views/contact_tracing_admin'));
to
const TracingAdmin = React.lazy(() => import('./views/Tracing_admin));
```

And  update the path from

```bash
{ path: '/contacttracingadmin', name: 'Contact Tracing Admin', component: ContactTracingAdmin }
to
{ path: '/tracingadmin, name: 'Tracing Admin', component: TracingAdmin }
```

Update the sidebar in ‘./dashboards/web/src/_nav.ts’ from
```bash
{
    _tag: CSidebarNavItem,
    name: ‘Contact Tracing Admin’,
    to: '/Contacttracingadmin,
    icon: 'cil-building'  
}
TO
{
    _tag: CSidebarNavItem,
    name: ‘Tracing Admin’,
    to: '/tracingadmin,
    icon: 'cil-building'  
}
```

## Create New Dashboard

### Steps to add a new Dashboard from scratch – (Example: Contact Tracing Dashboard)
1.	Adding new modules (Contact Tracing Dashboard) – Create the module(contact_tracing_dashboard) under  the “./src/views” directory and make a route link in the /routes.js file by following the below syntax. 
### Note: Module name should be a single word.
```bash
const Contact_tracing_dashboard = React.lazy(() => import('./views/Contact_tracing_dashboard));
```

2.	Define a path to the component in the /routes.js file
```bash
{ path: '/Contact_tracing_dashboard, name: ‘Contact Tracing Dashboard’, component: Contact_tracing_dashboard },
```
#### Note: name: ‘Contact Tracing Dashboard’ ==> This will appear in the Breadcrumbs

3.	To make this component visible in the application sidebar/menu bar:
 
a.	Search for the below lines of code in ./_nav.js (name: ‘Dashboards’) 

```bash
{
    _tag: CSidebarNavDropdown,
    name: 'Dashboards',
    //route: '/editors',
    icon: 'cil-speedometer',
    _children: [{}]
}
```

b.	Add the below created component (Contact_tracing_dashboard) under the children array in the above code. 
```bash
{
      _tag: CSidebarNavItem,
    	name: ‘Contact Tracing Dashboard’,
    	to: '/Contact_tracing_dashboard,
    	icon: 'cil-building'  
}
```

## Create New Administration

### Steps to add a new Admin screen from scratch – (Example: Contact Tracing Administration)
1.	Adding new modules (Contact Tracing Administration) – Create the module(Contact_tracing_admin) under  the “./src/views” directory and make a route link in the /routes.js file by following the below syntax. 
### Note: Module name should be a single word.
```bash
const Contact_tracing_admin = React.lazy(() => import('./views/Contact_tracing_admin));
```

2.	Define a path to the component in the /routes.js file
```bash
{ path: '/Contact_tracing_admin, name: ‘Contact  Admin, component: Contact_tracing_admin },
```
#### Note: name: ‘Contact Tracing Admin’ ==> This will appear in the Breadcrumbs

3.	To make this component visible in the application sidebar/menu bar:
 
    a.	Search for the below lines of code in ./_nav.js (name: ‘Administration) 
```bash
{
    _tag: CSidebarNavDropdown,
    name: Administration,
    //route: '/editors',
    icon: 'cil-speedometer',
    _children: [{}]
}
```

   b.	Add the below created component (Contact_tracing_admin ) under the children array in the above code. 
```bash
{
      _tag: CSidebarNavItem,
    	name: ‘Contact_tracing_admin,
    	to: '/ Contact_tracing_admin,
    	icon: 'cil-building'  
}
```


## Reference Links

[CoreUI - Live Preview](https://coreui.io/react/demo/#/dashboard/)   
[CoreUI Documentation](https://coreui.io/docs/2.1/getting-started/introduction/)

