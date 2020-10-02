// For Checkpoint Location QR

import React from 'react';

import TextInput from './components/TextInput.js';
import validate from './components/validate.js';
import Email from './components/Email.js';
import Select from './components/Select.js';
import CPQR from './CPQR.js';


const widthTable = {
	width: '700px'
};

const widthLabel = {
	width: '150px'
};

const widthDropDown = {
	width: '350px'
};

const widthTxtInput = {
	width: '334px'
};

const buttonStyle = {
	backgroundColor: 'yellow',
	width: '80px',
	height: '30px',
	borderRadius: '10px'
};

var locationid = "";

class CPQRGen extends React.Component {

	constructor() {
		super();

		this.state = {
			formIsValid: false,
			formControls: {
			
				firstName: {
				  value: '',
				  placeholder: 'What is your first name',
				  valid: false,
				  validationRules: {
					minLength: 1,
					isRequired: true
				  },
				  touched: false
				},
				lastName: {
				  value: '',
				  placeholder: 'What is your last name',
				  valid: false,
				  validationRules: {
					minLength: 1,
					isRequired: true
				  },
				  touched: false
				},
				contactNo: {
				  value: '',
				  placeholder: 'What is your contact number',
				  valid: false,
				  validationRules: {
					minLength: 1,
					isRequired: true
				  },
				  touched: false
				},
				my_email: {
				  value: '',
				  placeholder: 'What is your email',
				  valid: false,
				  validationRules: {
					isRequired: true,
					isEmail: true
				  },
				  touched: false
				},
				region: {
				  value: '',
				  placeholder: 'Select region',
				  valid: false,
				  touched: false,
				  validationRules: {
					isRequired: true,
				  },
				  options: [
					{ value: '', displayValue: 'Select region' },
					{ value: 'AMS', displayValue: 'Americas' },
					{ value: 'Asia', displayValue: 'Asia' },
					{ value: 'ANZ', displayValue: 'Australia and New Zealand'}
				  ]
				},
				country: {
				  value: '',
				  placeholder: 'Select Country',
				  valid: false,
				  touched: false,
				  validationRules: {
					isRequired: true,
				  },
				  options: [
					{ value: '', displayValue: 'Select Country' }
				  ]
				},
				city: {
				  value: '',
				  placeholder: 'Select City',
				  valid: false,
				  touched: false,
				  validationRules: {
					isRequired: true,
				  },
				  options: [
					{ value: '', displayValue: 'Select City' }
				  ]
				},
				office: {
				  value: '',
				  placeholder: 'Select Office',
				  valid: false,
				  touched: false,
				  validationRules: {
					isRequired: true,
				  },
				  options: [
					{ value: '', displayValue: 'Select Office' }
				  ]
				}
			
		  }
		}
	}


	changeHandler = event => {

		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = {...this.state.formControls};
		const updatedFormElement = {...updatedControls[name]};
		updatedFormElement.value = value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

		updatedControls[name] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}

		this.setState({
			formControls: updatedControls,
			formIsValid: formIsValid
		});
	}

	handleChangeDropListRegion  = event => {

		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = {...this.state.formControls};
		const updatedFormElement = {...updatedControls[name]};
		updatedFormElement.value = value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

		updatedControls[name] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}

		const updatedFormElementTable = {...updatedControls["country"]};

		if ("AMS" == value) {
			var optionCountry = [
				{ value: '', displayValue: 'Select Country' },
				{ value: 'America', displayValue: 'America' }
			]
			updatedFormElementTable.options = optionCountry;

		} else if ("ANZ" == value) {
			var optionCountry = [
				{ value: '', displayValue: 'Select Country' },
				{ value: 'Australia', displayValue: 'Australia' }
			]
			updatedFormElementTable.options = optionCountry;

		} else if ("Asia" == value) {
			var optionCountry = [
				{ value: '', displayValue: 'Select Country' },
				{ value: 'Philippines', displayValue: 'Philippines' },
				{ value: 'Singapore', displayValue: 'Singapore' },
				{ value: 'Vietnam', displayValue: 'Vietnam' }
			]
			updatedFormElementTable.options = optionCountry;
		} else {
			console.error("region not found!");
		}

		updatedFormElementTable.value = "";
		updatedControls["country"] = updatedFormElementTable;

		const updatedFormElementCityTable = {...updatedControls["city"]};
		var optionCity = [
			{ value: '', displayValue: 'Select City' }
		]
		updatedFormElementCityTable.options = optionCity;
		updatedFormElementCityTable.value = "";
		updatedControls["city"] = updatedFormElementCityTable;

		const updatedFormElementOfficeTable = {...updatedControls["office"]};
		var optionOffice = [
			{ value: '', displayValue: 'Select Office' }
		]
		updatedFormElementOfficeTable.options = optionOffice;
		updatedFormElementOfficeTable.value = "";
		updatedControls["office"] = updatedFormElementOfficeTable;

		this.setState({
			formControls: updatedControls,
			formIsValid: formIsValid,
		});
	}

	handleChangeDropListCountry  = event => {

		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = {...this.state.formControls};
		const updatedFormElement = {...updatedControls[name]};
		updatedFormElement.value = value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

		updatedControls[name] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}

		const updatedFormElementTable = {...updatedControls["city"]};

		if ("America" == value) {
			var optionCity = [
				{ value: '', displayValue: 'Select City' },
				{ value: 'Virginia', displayValue: 'Virginia' },
				{ value: 'Texas', displayValue: 'Texas' }
			]
			updatedFormElementTable.options = optionCity;

		} else if ("Australia" == value) {
			var optionCity = [
				{ value: '', displayValue: 'Select City' },
				{ value: 'Sydney', displayValue: 'Sydney' },
				{ value: 'Melbourne', displayValue: 'Melbourne' }
			]
			updatedFormElementTable.options = optionCity;

		} else if ("Philippines" == value) {
			var optionCity = [
				{ value: '', displayValue: 'Select City' },
				{ value: 'Manila', displayValue: 'Manila' }
			]
			updatedFormElementTable.options = optionCity;

		} else if ("Singapore" == value) {
			var optionCity = [
				{ value: '', displayValue: 'Select City' },
				{ value: 'Singapore', displayValue: 'Singapore' }
			]
			updatedFormElementTable.options = optionCity;

		} else if ("Vietnam" == value) {
			var optionCity = [
				{ value: '', displayValue: 'Select City' },
				{ value: 'HoChiMinh', displayValue: 'Ho Chi Minh City' }
			]
			updatedFormElementTable.options = optionCity;

		} else {
			console.error("City not found!");
		}

		updatedFormElementTable.value = "";
		updatedControls["city"] = updatedFormElementTable;

		const updatedFormElementOfficeTable = {...updatedControls["office"]};
		var optionOffice = [
			{ value: '', displayValue: 'Select Office' }
		]
		updatedFormElementOfficeTable.options = optionOffice;
		updatedFormElementOfficeTable.value = "";
		updatedControls["office"] = updatedFormElementOfficeTable;



		this.setState({
			formControls: updatedControls,
			formIsValid: formIsValid,
		});
	}

	handleChangeDropListCity  = event => {

		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = {...this.state.formControls};
		const updatedFormElement = {...updatedControls[name]};
		updatedFormElement.value = value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

		updatedControls[name] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}

		const updatedFormElementTable = {...updatedControls["office"]};

		if ("Virginia" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'Tysons', displayValue: '1775 Tysons Blvd, Tysons, VA 22102' }
			]
			updatedFormElementTable.options = optionOffice;

		} else if ("Texas" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'Plano', displayValue: 'Plano' }
			]
			updatedFormElementTable.options = optionOffice;

		} else if ("Sydney" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'MacquariePark', displayValue: 'Macquarie Park' }
			]
			updatedFormElementTable.options = optionOffice;

		} else if ("Melbourne" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'CollinsStreet', displayValue: 'Collins Street' }
			]
			updatedFormElementTable.options = optionOffice;

		} else if ("Manila" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'IPC_TaguigCity', displayValue: 'Intellectual Property Centre, Fort Bonifacio, Taguig City' }
			]
			updatedFormElementTable.options = optionOffice;

		} else if ("Singapore" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'Singapore', displayValue: '1 Depot Close Singapore 109841' }
			]
			updatedFormElementTable.options = optionOffice;

		} else if ("HoChiMinh" == value) {
			var optionOffice = [
				{ value: '', displayValue: 'Select Office' },
				{ value: 'TanBinhDistrict_HoChiMinhCity', displayValue: 'eTown 5 Building, Tan Binh District, Ho Chi Minh City' }
			]
			updatedFormElementTable.options = optionOffice;

		} else {
			console.error("Office not found!");
		}

		updatedFormElementTable.value = "";
		updatedControls["office"] = updatedFormElementTable;

		this.setState({
			formControls: updatedControls,
			formIsValid: formIsValid,
		});
	}

	handleChangeDropListOffice  = event => {

		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = {...this.state.formControls};
		const updatedFormElement = {...updatedControls[name]};
		updatedFormElement.value = value;
		updatedFormElement.touched = true;
		updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

		updatedControls[name] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}
		locationid = value;

		this.setState({
			formControls: updatedControls,
			formIsValid: formIsValid,
		});
	}


	formSubmitHandler = () => {
		const formData = {};
		for (let formElementId in this.state.formControls) {
			formData[formElementId] = this.state.formControls[formElementId].value;
		}
		new Promise ((resolve) => {resolve(CPQR(formData));}).then((x)=> this.genFile(x));
	}

	genFile(qrPDF) {

		//Get Date & TIme
		var creationDate = new Date().toLocaleDateString('en-US',{year: "numeric", month:"2-digit", day:"2-digit"}).split('/')
		var creationTime = new Date().toLocaleTimeString('en-US', {hour12:false}).replace(/:/g, "")
		var month = creationDate[0]
		var day = creationDate[1]
		var year = creationDate[2]

		//Filename with datetime
		var fileName = process.env.REACT_APP_CHECKPOINT_QR_FILENAME + "-"+ locationid + "_"+ year + month + day + "-" + creationTime + ".pdf"
		const element = document.createElement("a");
		//const file = new Blob([qrPDF], {type: 'application/pdf'});
		const file = new Blob([qrPDF], {type: 'text/html'});
		element.href = URL.createObjectURL(file);
		element.download = fileName;
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
console.log(fileName);
	}


	render (){
		return (

		<div className="App">

			<header role="banner" class="wrapper">
				<div>
					<h1 class="flex flex-wrap">Checkpoint Gatekeeper QR Generator - Test Update -Part1
					</h1><br />
				</div>
			</header>

			<table style={widthTable}>
			<tbody>
				<tr>
					<td style={widthLabel}>Region:</td>
					<td>
					<Select name="region"
						value={this.state.formControls.region.value}
						onChange={this.handleChangeDropListRegion}
						options={this.state.formControls.region.options}
						touched={this.state.formControls.region.touched}
						valid={this.state.formControls.region.valid}
					/>
				</td>
				</tr>
				<tr>
					<td style={widthLabel}>Country:</td>
					<td>
					<Select name="country"
						value={this.state.formControls.country.value}
						onChange={this.handleChangeDropListCountry}
						options={this.state.formControls.country.options}
						touched={this.state.formControls.country.touched}
						valid={this.state.formControls.country.valid}
					/>
					</td>
				</tr>
				<tr>
					<td style={widthLabel}>City:</td>
					<td>
					<Select name="city"
						value={this.state.formControls.city.value}
						onChange={this.handleChangeDropListCity}
						options={this.state.formControls.city.options}
						touched={this.state.formControls.city.touched}
						valid={this.state.formControls.city.valid}
					/>
					</td>
				</tr>
				<tr>
					<td style={widthLabel}>Office:</td>
					<td>
					<Select name="office"
						value={this.state.formControls.office.value}
						onChange={this.handleChangeDropListOffice}
						options={this.state.formControls.office.options}
						touched={this.state.formControls.office.touched}
						valid={this.state.formControls.office.valid}
					/>
					</td>
				</tr>
				<tr>
					<td style={widthLabel}>First Name:</td>
					<td>
					<TextInput name="firstName"
						placeholder={this.state.formControls.firstName.placeholder}
						value={this.state.formControls.firstName.value}
						onChange={this.changeHandler}
						touched={this.state.formControls.firstName.touched}
						valid={this.state.formControls.firstName.valid}
					/>
					</td>
				</tr>
				<tr>
					<td style={widthLabel}>Last Name:</td>
					<td>
					<TextInput name="lastName"
						placeholder={this.state.formControls.lastName.placeholder}
						value={this.state.formControls.lastName.value}
						onChange={this.changeHandler}
						touched={this.state.formControls.lastName.touched}
						valid={this.state.formControls.lastName.valid}
					/>
					</td>
				</tr>
				<tr>
					<td style={widthLabel}>Contact Number:</td>
					<td>
					<TextInput name="contactNo"
						placeholder={this.state.formControls.contactNo.placeholder}
						value={this.state.formControls.contactNo.value}
						onChange={this.changeHandler}
						touched={this.state.formControls.contactNo.touched}
						valid={this.state.formControls.contactNo.valid}
					/>
					</td>
				</tr>
				<tr>
					<td style={widthLabel}>Email:</td>
					<td>
					<Email name="my_email"
						placeholder={this.state.formControls.my_email.placeholder}
						value={this.state.formControls.my_email.value}
						onChange={this.changeHandler}
						touched={this.state.formControls.my_email.touched}
						valid={this.state.formControls.my_email.valid}
					/>
					</td>
				</tr>
				</tbody>
			</table><br /><br />

			<button onClick={this.formSubmitHandler}
				disabled={! this.state.formIsValid} style={buttonStyle}
			>
			Submit
			</button>
			
		</div>
		);
	}
}
export default CPQRGen;
