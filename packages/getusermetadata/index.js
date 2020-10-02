// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

//Export handler
exports.handler = function(event, context, callback) {
var params = {
  UserPoolId: process.env.USER_POOL_ID,
  Username: event.body.username
};
  cognitoidentityserviceprovider.adminGetUser(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err); // here is the error return
    }
    
      else {

        data.Name = data.UserAttributes[2].Value;
        data.Email = data.UserAttributes[3].Value;
      callback(null, data); // here is the success return
    }
  });
};