// To generate PDF content for Visitor Notice

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import QRCode from 'qrcode'
import pdfBase from '../../../../assets/files/Checkpoints/TemplateVisitor.pdf'

export default async function (data) {

//var region = data["region"];
//var country = data["country"];
//var city = data["city"];
var office = data["office"];


	const pdfFileBytes = await fetch(pdfBase).then(res => res.arrayBuffer());
	const pdfDoc = await PDFDocument.load(pdfFileBytes);		
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);		
	const pages = pdfDoc.getPages();		 
	const firstPage = pages[0];
	// Get the width and height of the pdf pages
	const { width, height } = firstPage.getSize();
	const visitorURL = encodeURI(process.env.REACT_APP_CHECKPOINT_VISITOR_SURVEY_DOMAIN + office + "/" + process.env.REACT_APP_CHECKPOINT_VISITOR_SURVEY_TOKEN);
	
	console.log("visitorURL: " + visitorURL)

    var opts = {
		errorCorrectionLevel: 'M',
		type: 'image/png',
		quality: 1,
		margin: 1,
		width: 200
    };
    const qrCodeVisitor = await QRCode.toDataURL(visitorURL, opts);
	const qrImage = await pdfDoc.embedPng(qrCodeVisitor);

	firstPage.drawImage(qrImage, {
		x: 200,
		y: 170
	});

	// Imprint the location onto the PDF
	firstPage.drawText(office, {
		x: 210,
		y: 160,
		size: 10,
		font: helveticaFont,
		color: rgb(0, 0, 0)
	});
	
	//Get Date & TIme
	var creationDate = new Date().toLocaleDateString('en-US',{year: "numeric", month:"2-digit", day:"2-digit"}).split('/')
	var creationTime = new Date().toLocaleTimeString('en-US', {hour12:false}).replace(/:/g, "")
	var month = creationDate[0]
	var day = creationDate[1]
	var year = creationDate[2]
		
	//Imprint the datetime onto the PDF
	firstPage.drawText(year + month + day + "-" + creationTime, {
		x: 500,
		y: 50,
		size: 7,
		font: helveticaFont,
		color: rgb(0, 0, 0)
	});
	
	const pdfBytes = await pdfDoc.save()

	return pdfBytes;

}
