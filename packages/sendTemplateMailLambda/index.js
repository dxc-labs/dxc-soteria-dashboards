var aws = require('aws-sdk');

exports.handler = async (event, context) => {

return new Promise((resolve,reject)=>{
	
     const params = {
           Template: event.body.template_name,
           Destination: { 
             ToAddresses: event.body.sendto
             
           },
           Source: event.body.sentfrom, 
           TemplateData: JSON.stringify(event.body.data || {})
     };
     
	var ses = new aws.SES({ region: event.body.region });
	
	ses.sendTemplatedEmail(params, function(error, data){
           
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
        		resolve({"Status":"Success"});
           }
       
    });
    
                  
});

};