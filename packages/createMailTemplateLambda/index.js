var aws = require('aws-sdk');

exports.handler = async (event, context) => {

return new Promise((resolve,reject)=>{
	
     var params = {
           Template: { 
              TemplateName: event.body.template_name, 
              HtmlPart: event.body.htmlbody,
              SubjectPart: event.body.subject      
           }
     };
     
	var ses = new aws.SES({ region: event.body.region });
	
	ses.createTemplate(params, function(error, data){
           
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

}