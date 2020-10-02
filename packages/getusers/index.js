// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

//Export handler
exports.handler = function(event, context, callback) {
  var params = {
    UserPoolId: process.env.USER_POOL_ID
  };

  cognitoidentityserviceprovider.listUsers(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err); // here is the error return
    }

    else {
      for (let item of data.Users) {
        item.Name = item.Attributes[2].Value;
        item.Email = item.Attributes[3].Value;
      }
      //console.log("data.Users", data.Users);
      callback(null, data.Users); // here is the success return
    }
  });
};
