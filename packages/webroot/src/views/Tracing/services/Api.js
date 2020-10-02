import { API, Amplify, Auth } from "aws-amplify";

const apiName = "tracing";
console.log("API INIT");
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID.split("_")[0],
    userPoolId: process.env.REACT_APP_DASHBOARD_COGNITO_USERPOOL_ID,
    userPoolWebClientId: process.env.REACT_APP_DASHBOARD_COGNITO_WEB_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: apiName,
        endpoint: `${process.env.REACT_APP_API_DOMAIN}tracing`,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`
          };
        }
      }
    ]
  }
});

//GET LOCATIONS
export const getLocations = (qParams = null) => {
  // EG. getLocations({ root: true, locationCode: "Australia" })
  let params = {};
  if (qParams) {
    params["queryStringParameters"] = qParams;
  }

  return API.get(apiName, "/locations", params);
};

//GET LOCATION
export const getLocation = locationId => {
  return API.get(apiName, `/locations/${locationId}`);
};

//PATCH LOCATION
export const patchLocation = (locationId, body) => {
  let params = { response: true };
  params["body"] = body;
  console.log(locationId, params);
  console.log(body);
  return API.patch(apiName, `/locations/${locationId}`, params);
};

//RIGHT OF ACCESS
export const rightOfAccess = email => {
  return API.post(apiName, `/admin/gdpr/right-of-access`, {
    body: { email: email }
  });
};

//BULK UPLOAD
export const bulkLocation = params => {
  return API.post(apiName, `/locations`, {
    body: params
  });
};

//LOCATION TRACE GET
export const locationTrace = (userId, params) => {
  return API.get(apiName, `/tracing/user/${userId}`, params);
};

//QR CODE API
export const qrCodeGen = params => {
  let myInIt = {
    body: params,
    headers: { Accept: "application/pdf" },
    responseType: "blob"
  };

  return API.post(apiName, `/qr`, myInIt);
};

//Adds Trace Entity to DB
export const postTrace = params => {
  let init = {
    body: params,
    headers: { Accept: "application/json" }
  };

  return API.post(apiName, `/tracing`, init);
};

//Get the users email for a given userId
export const getUserByEmail = email => {
  // TODO
  let init = {
    headers: { Accept: "application/json" }
  };
  return API.get(apiName, `/admin/users/${email}`, init);
};
export const getUserById = userId => {
  // TODO
  let init = {
    headers: { Accept: "application/json" }
  };
  return API.get(apiName, `/admin/users/${userId}`, init);
};
