var aws = require('aws-sdk');

exports.handler = async (event, context) => {

return new Promise((resolve,reject)=>{
	
     var params = {
                    MaxItems: 50,
                    NextToken: event.body.next_token 
                  };
    var ses = new aws.SES({ region: event.body.region });
    
	ses.listTemplates(params, function(error, data){
           
           if(error){
                    console.log(error);
                    
      var resp = {
        status: "Failed",
        errors: [
            {              
              message:  error.message,
             
            }
        ]
      };
     
      reject(JSON.stringify(resp));
           }
           else{
        		console.log(data);
        		var jsonData = {};
        		
        		if(data.TemplatesMetadata != null){
        		    jsonData["templates"] = data.TemplatesMetadata;
        		}
        		if(data.NextToken != null){
        		    jsonData["NextToken"] = data.NextToken;
        		}
        		resolve([jsonData]);
           }
       
    });
    
                  
});

}