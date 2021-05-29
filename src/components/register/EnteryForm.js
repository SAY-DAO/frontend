import React, { useState, useEffect } from "react";
import { Grid, Divider, Typography, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { changeVerifyStep, verifyEmail, verifyPhone } from "../../actions/userAction";
import { validatePhone, validateEmail } from "../../inputsValidation";
import Message from "../Message";
import { contents , errorClassName} from "../../inputsValidation/Contents";

// Customized "react-phone-input-2/lib/material.css"
import "../../resources/styles/css/material.css";



const EnteryForm = () => {
	const { t } = useTranslation();
	// const [_isLoggedIn, setIsLoggedIn] = useState(false);
	const [validateErr, setValidateErr] = useState("");
	const [erEmail, setErEmail] = useState("");
	const [erPhoneNumber, setErPhoneNumber] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [email, setEmail] = useState("");
	const [isDisabled, setisDisabled] = useState(true);
	const dispatch = useDispatch();


	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
		setPhoneNumber(countryCode);

	};

	const handleChangePhoneNumber = (input, data, event, formattedValue)=> {
		console.log(input, data, event, formattedValue);
		console.log(phoneNumber.split(" ").join(""));
		setEmail("");
		setCountryCode(data.countryCode);
		setPhoneNumber(formattedValue);
	};

	useEffect(() => {
		if((validateErr.length > 3) || (validateErr === "" && (email == "" && phoneNumber == "")) ){
			setisDisabled(true);
		}else {
			setisDisabled(false);
		}
	}, [validateErr, email, phoneNumber]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validateEmail(t, email);
				setValidateErr(result.errorMessage);
				setErEmail(result.erEmail);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [email]);
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			(async () => {
				const result = await validatePhone(t, phoneNumber);
				setValidateErr(result.errorMessage);
				setErPhoneNumber(result.erPhoneNumber);
			})();
		}, 500);
		return () => clearTimeout(timeout);
	}, [phoneNumber]);


	const handleVerify = () => {
		if (!validateErr) {
			if (email) {
				(async () => {
					let result = await validateEmail(t, email);
					if (!(result.errorMessage || result.erEmail)) {
						dispatch(verifyEmail(email));
						dispatch(changeVerifyStep(2));
						// 	return;
						// }
					} else {
						setValidateErr(result.errorMessage);
						setErEmail(result.erEmail);
						return;
					}
				})();
			} else {
				(async () => {
					let result = await validatePhone(phoneNumber);
					if (!(result.errorMessage || result.erPhoneNumber)) {
						dispatch(verifyPhone(phoneNumber));
						// let verifyResult = await verifyPhone(t, phoneNumber);
						// if (!isNaN(verifyResult)) {
						// 	setVerificationProperty(initialsVerifyProperty.PHONE);
						// 	setVerifyId(verifyResult);
						dispatch(changeVerifyStep(2));
						// 	dispatch(requestVerifyCode({
						// 		phoneNumber: phoneNumber.split(" ").join(""),
						// 		countryCode,
						// 		email,
						// 		verifyId,
						// 		verificationProperty
						// 	}));
						// 	return;
						// }
					} else {
						setValidateErr(result.errorMessage);
						setErPhoneNumber(result.erPhoneNumber);
						return;
					}
				})();
			}
		} else {
			return;
		}
	};


	const checkRequired = () => {
		if (!(phoneNumber || email)) {
			setValidateErr(contents.fillOne);
			setErEmail(errorClassName);
			setErPhoneNumber(errorClassName);
		} else {
			handleVerify();
		}
	};

	return (
		<Grid container
			direction="column"
			justifyContent="center"
			alignItems="center"
			maxWidth
			sx={{direction: "ltr"}}
		>
			<Grid item xs={12}>
				<FormControl variant="outlined">
					<PhoneInput
						specialLabel={t("placeholder.phoneNumber")}
						country={"ir"}
						value={phoneNumber}
						disableDropdown='false'
						onChange={handleChangePhoneNumber}
						inputProps={{
							name: "phone"
						}}
						defaultMask="... ... .. ..."
						countryCodeEditable={false}
					/>
					<Divider sx={{marginTop: 4, marginBottom: 4}}>
						<Typography variant="subtitle1">
							{t("devider.register")}
						</Typography>
					</Divider>
					<TextField
						type="email"
						id="outlined-adornment-email"
						label={t("placeholder.email")}
						value={email}
						onChange={handleChangeEmail}
						aria-describedby="outlined-weight-helper-text"
						inputProps={{
							"aria-label": "email",
						}}
					/>
					
				</FormControl>
			</Grid>
			<Grid item xs={12}sx={{marginTop: 10}}>
				<Button variant="contained" color="primary" onClick={checkRequired} disabled={isDisabled} sx={{bottom: 5}}>
					{t("button.submit")}
				</Button>
			</Grid>
			<Grid item xs={12}>
				{!validateErr == "" && (
					<Message variant="outlined" severity="error">
						{validateErr}
					</Message>
				)}
				<div>{ erPhoneNumber, erEmail , isDisabled}</div>
			</Grid>
		</Grid>
	);
};

export default EnteryForm;
