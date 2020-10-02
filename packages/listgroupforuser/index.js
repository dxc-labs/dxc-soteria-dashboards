// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

//Export handler
exports.handler = function(event, context, callback) {
var params = {
  UserPoolId: process.env.USER_POOL_ID,
  Username: event.body.username
};
  cognitoidentityserviceprovider.adminListGroupsForUser(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err); // here is the error return
    }
    else {
      console.log(data);
      callback(null, data); // here is the success return
    }
  });
};