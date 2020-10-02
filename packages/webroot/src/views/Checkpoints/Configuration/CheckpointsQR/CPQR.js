//For Generation of Checkpoint QR Code PDF data

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import QRCode from 'qrcode'
import pdfBase from '../../../../assets/files/Checkpoints/TemplateCheckpoint.pdf'


export default async function (data) {

	var fullName = data["lastName"] + ", " + data["firstName"];
	var contactNo = data["contactNo"];
	var email = data["my_email"];
	var region = data["region"];
	var country = data["country"];
	var city = data["city"];
	var office = data["office"];
	var authorizationToken = "";

if (office === "Timbuktu") {
authorizationToken = "xxx";
} else {

	var theUrl = "https://api-badge.example.com/auth/tokens";
	var jsonData = "{\"locationId\": \""+office+"\",\"contactName\": \""+fullName+"\",\"email\": \""+email+"\",\"contactNumber\": \""+contactNo+"\"} ";

	const postdata = {
		method: 'POST',
		headers: { 'Content-Type': 'text/plain' },
		body: jsonData
	}

	authorizationToken = await fetch(theUrl, postdata)
	.then(response => response.json())
	.then(response => response.token);
}
	//console.log("authorizationTokenPromise: " + authorizationToken)
	const pdfFileBytes = await fetch(pdfBase).then(res => res.arrayBuffer());
	const pdfDoc = await PDFDocument.load(pdfFileBytes);
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
	const pages = pdfDoc.getPages()
	const firstPage = pages[0]
	// Get the width and height of the pdf pages
	const { width, height } = firstPage.getSize()

	var opts = {
		errorCorrectionLevel: 'M',
		type: 'image/png',
		quality: 1,
		margin: 1,
		width: 200
	};
	
	const qrURL = encodeURI(process.env.REACT_APP_CHECKPOINT_QRURL + office + "#" + authorizationToken);
	console.log(qrURL);
	const qrCodeCP = await QRCode.toDataURL(qrURL, opts);
	
	const qrImage = await pdfDoc.embedPng(qrCodeCP);

	firstPage.drawImage(qrImage, {
		x: 190,
		y: 400
	});

	// Imprint the location onto the PDF
	firstPage.drawText(office, {
		x: 200,
		y: 390,
		size: 10,
		font: helveticaFont,
		color: rgb(0, 0, 0)
	});

	firstPage.drawText("Name: "+ fullName, {
		x: 200,
		y: 300,
		size: 14,
		font: helveticaFont,
		color: rgb(0, 0, 0)
	});
	firstPage.drawText("Contact Number: "+contactNo, {
		x: 200,
		y: 280,
		size: 14,
		font: helveticaFont,
		color: rgb(0, 0, 0)
	});
	firstPage.drawText("Email: "+email, {
		x: 200,
		y: 260,
		size: 14,
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
		size: 6,
		font: helveticaFont,
		color: rgb(0, 0, 0)
	})
	
	const pdfBytes = await pdfDoc.save()

	return pdfBytes;
}
