// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

//Export handler
exports.handler = function(event, context, callback) {
var params = {
  GroupName: event.body.groupname,
  UserPoolId: process.env.USER_POOL_ID,
  Username: event.body.username
};
  cognitoidentityserviceprovider.adminAddUserToGroup(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err); // here is the error return
    }
    else {
      console.log(data);
      callback(null, {"status":"success"}); // here is the success return
    }
  });
};