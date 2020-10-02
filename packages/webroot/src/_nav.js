import React from 'react';
import { CSidebarNavDropdown, CSidebarNavItem } from '@coreui/react'
import { linearSet } from "@coreui/icons-pro/js/linear";
import { solidSet } from "@coreui/icons-pro/js/solid";
import { brandSet } from "@coreui/icons-pro/js/brand";
import { duotoneSet } from "@coreui/icons-pro/js/duotone";

React.icons = { ...solidSet, ...linearSet, ...brandSet, ...duotoneSet };

export const usernav = [
  {
    _tag: CSidebarNavItem,
    name: 'Home',
    to: '/dashboards/homepage',
    icon: 'cil-home',
    size: "xl"
  },
  {
    _tag: CSidebarNavDropdown,
    name: 'Documentation',
    //route: '/editors',
    icon: 'cil-book',
    _children: [
      {
        _tag: CSidebarNavItem,
        name: 'Checkpoints',
        to: '/dashboards/checkpointsdocumentation',
        icon: 'cil-book'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Facility',
        to: '/dashboards/facilitydocumentation',
        icon: 'cil-book'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Locations',
        to: '/dashboards/locationsdocumentation',
        icon: 'cil-book'
      },
      {
        _tag: CSidebarNavItem,
        name: 'QuickStart',
        to: '/dashboards/quickstartdocumentation',
        icon: 'cil-book'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Surveys',
        to: '/dashboards/surveysdocumentation',
        icon: 'cil-book'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Tracing',
        to: '/dashboards/tracingdocumentation',
        icon: 'cil-book'
      }
    ]
  }
]

export const adminnav = [
  {
    _tag: CSidebarNavItem,
    name: 'Home',
    to: '/dashboards/homepage',
    icon: 'cid-home'
  },
  {
    _tag: CSidebarNavItem,
    name: 'Locations Tracing',
    to: '/dashboards/tracing-LocationsTracing',
    icon: 'cid-location-pin-check'
  },
  {
    _tag: CSidebarNavDropdown,
    name: 'Configuration',
    //route: '/editors',
    icon: 'cis-settings',
    _children: [
      {
        _tag: CSidebarNavDropdown,
        name: 'Checkpoints',
        //route: '/editors',
        icon: 'cis-shield-check',
        _children: [
          {
            _tag: CSidebarNavItem,
            name: 'Gatekeeper QR Generator',
            to: '/dashboards/checkpoints-gatekeeperqr',
            icon: 'cil-qr-code'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Visitor Notice ',
            to: '/dashboards/checkpoints-visitornotice',
            icon: 'cis-report'
          }
        ]
      },
      {
        _tag: CSidebarNavItem,
        name: 'Email Template',
        to: '/dashboards/emailtemplate',
        icon: 'cid-mail'
      },
      {
        _tag: CSidebarNavDropdown,
        name: 'Tracing',
        //route: '/editors',
        icon: 'cid-contacts',
        _children: [
          {
            _tag: CSidebarNavItem,
            name: 'QR Generator',
            to: '/dashboards/tracing-QRCodeGen',
            icon: 'cil-qr-code'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Location Upload ',
            to: '/dashboards/tracing-BulkLocationUpload',
            icon: 'cis-cloud-upload'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Locations',
            to: '/dashboards/tracing-Locations',
            icon: 'cis-location-pin-edit'
          }
        ]
      },
      {
        _tag: CSidebarNavDropdown,
        name: 'Surveys',
        icon: 'cid-clipboard',
        _children: [
          {
            _tag: CSidebarNavItem,
            name: 'Manage Surveys',
            to: '/dashboards/Surveys',
            icon: 'cid-clipboard'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Message Of The Day ',
            to: '/dashboards/Surveys-MOTD',
            icon: 'cid-shield-plus'
          }
        ]
      },
    ]
  },
  {
    _tag: CSidebarNavDropdown,
    name: 'Documentation',
    //route: '/editors',
    icon: 'cid-library-books',
    _children: [
      {
        _tag: CSidebarNavItem,
        name: 'Text - Visual',
        to: '/dashboards/texttovisual',
        icon: 'cid-brush'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Checkpoints',
        to: '/dashboards/checkpointsdocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Facility',
        to: '/dashboards/facilitydocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Locations',
        to: '/dashboards/locationsdocumentation',
        icon: 'cid-document'
      },
      {

        _tag: CSidebarNavItem,
        name: 'QuickStart',
        to: '/dashboards/quickstartdocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Surveys',
        to: '/dashboards/surveysdocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Tracing',
        to: '/dashboards/tracingdocumentation',
        icon: 'cid-document'
      }
    ]
  }
]

export const rootnav = [
  {
    _tag: CSidebarNavItem,
    name: 'Home',
    to: '/dashboards/homepage',
    icon: 'cid-home'
  },
  {
    _tag: CSidebarNavItem,
    name: 'Locations Tracing',
    to: '/dashboards/tracing-LocationsTracing',
    icon: 'cil-location-pin-check'
  },
  {
    _tag: CSidebarNavItem,
    name: 'User Permissions',
    to: '/dashboards/userpermission',
    icon: 'cid-security'
  },
  {
    _tag: CSidebarNavDropdown,
    name: 'Configuration',
    //route: '/editors',
    icon: 'cis-settings',
    _children: [
      {
        _tag: CSidebarNavDropdown,
        name: 'Checkpoints',
        //route: '/editors',
        icon: 'cis-shield-check',
        _children: [
          {
            _tag: CSidebarNavItem,
            name: 'Gatekeeper QR Generator',
            to: '/dashboards/checkpoints-gatekeeperqr',
            icon: 'cil-qr-code'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Visitor Notice ',
            to: '/dashboards/checkpoints-visitornotice',
            icon: 'cis-report'
          }
        ]
      },
      {
        _tag: CSidebarNavItem,
        name: 'Email Template',
        to: '/dashboards/emailtemplate',
        icon: 'cid-mail'
      },

      {
        _tag: CSidebarNavDropdown,
        name: 'Tracing',
        //route: '/editors',
        icon: 'cid-contacts',
        _children: [
          {
            _tag: CSidebarNavItem,
            name: 'QR Generator',
            to: '/dashboards/tracing-QRCodeGen',
            icon: 'cil-qr-code'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Location Upload ',
            to: '/dashboards/tracing-BulkLocationUpload',
            icon: 'cil-location-pin-plus'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Locations',
            to: '/dashboards/tracing-Locations',
            icon: 'cis-location-pin-edit'
          }
        ]
      },
      {
        _tag: CSidebarNavDropdown,
        name: 'Surveys',
        icon: 'cid-clipboard',
        _children: [
          {
            _tag: CSidebarNavItem,
            name: 'Manage Surveys',
            to: '/dashboards/Surveys',
            icon: 'cid-clipboard'
          },
          {
            _tag: CSidebarNavItem,
            name: 'Message Of The Day ',
            to: '/dashboards/Surveys-MOTD',
            icon: 'cid-shield-plus'
          }
        ]
      },
    ]
  },
  {
    _tag: CSidebarNavDropdown,
    name: 'Documentation',
    //route: '/editors',
    icon: 'cid-library-books',
    _children: [
      {
        _tag: CSidebarNavItem,
        name: 'Text - Visual',
        to: '/dashboards/texttovisual',
        icon: 'cid-brush'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Checkpoints',
        to: '/dashboards/checkpointsdocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Facility',
        to: '/dashboards/facilitydocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Locations',
        to: '/dashboards/locationsdocumentation',
        icon: 'cid-document'
      },
      {

        _tag: CSidebarNavItem,
        name: 'QuickStart',
        to: '/dashboards/quickstartdocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Surveys',
        to: '/dashboards/surveysdocumentation',
        icon: 'cid-document'
      },
      {
        _tag: CSidebarNavItem,
        name: 'Tracing',
        to: '/dashboards/tracingdocumentation',
        icon: 'cid-document'
      }
    ]
  }
]
