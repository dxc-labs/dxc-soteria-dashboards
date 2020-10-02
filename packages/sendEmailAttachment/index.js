var aws = require('aws-sdk');
var nodemailer = require('nodemailer');

exports.handler = async (event, context, callback) => {
	if (!event.body.subject) {
        context.fail('Missing argument: subject');
    }
    if (!event.body.from) {
        context.fail('Missing argument: from');
    }
    if (!event.body.html && !event.body.text) {
        context.fail('Missing argument: html|text');
    }
    if (!event.body.bcc && !event.body.to && !event.body.cc) { 
        context.fail('Missing argument: bcc|to|cc');
    }
    var ses = new aws.SES({ region: event.body.region });
	
	var to 	    = event.body.to;
    var cc      = event.body.cc;
    var bcc     = event.body.bcc;
    var from 	= event.body.from;
    var subject = event.body.subject;
    var htmlBody = event.body.html;
    var textBody = event.body.text;
    var attachments = event.body.attachments;
	    
    var mailOptions = {
        from: from,
        subject: subject,
        text: textBody ? textBody : '',
        html: htmlBody ? htmlBody : '',
        bcc: bcc ? bcc : '',
        to: to ? to : '',
        cc: cc ? cc : '',
        attachments: attachments ? attachments : []
    };
	
   var transporter = nodemailer.createTransport({
        SES: ses
    });

return new Promise((resolve,reject)=>{

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log("error is "+error);
       resolve({message: error.message }); 
    } 
   else {
       console.log('Email sent: ' + info.response);
       resolve({message:"Email Sent"});
    }
   });
 });  
};