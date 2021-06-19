import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useTranslation, Trans } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  changeVerifyStep,
  verifyUser,
  checkContactBeforeVerify,
} from '../../actions/userAction';
import validateEmail from '../../inputsValidation/validateEmail';
import validatePhone from '../../inputsValidation/validatePhone';
import Message from '../Message';
import contents from '../../inputsValidation/Contents';
import Back from '../Back';
import { USER_VERIFY_RESET } from '../../constants/userConstants';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '300px',
  },
});

const EntryForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const [_isLoggedIn, setIsLoggedIn] = useState(false);
  const [validateErr, setValidateErr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const verifyInfo = useSelector((state) => state.verifyInfo);
  const {
    loading: loadingVerify,
    error: errorVerify,
    success: successVerify,
  } = verifyInfo;

  const checkContact = useSelector((state) => state.checkContact);
  const {
    loading: loadingCheck,
    error: errorCheck,
    success: successCheck,
  } = checkContact;

  // check email every 1000 ms when typing
  useEffect(() => {
    const result = validateEmail(email);
    if (result && result.errorMessage) {
      const timeout = setTimeout(() => {
        setValidateErr(t(result.errorMessage));
      }, 1000);
      return () => clearTimeout(timeout);
    }
    if (!result && email) {
      const timeout = setTimeout(() => {
        dispatch(checkContactBeforeVerify('email', email));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [email]);

  // check phone every 1000 ms when typing
  useEffect(() => {
    const result = validatePhone(phoneNumber, countryCode);
    if (result && result.errorMessage) {
      const timeout = setTimeout(() => {
        setValidateErr(t(result.errorMessage));
      }, 1000);
      return () => clearTimeout(timeout);
    }
    if (!result && phoneNumber) {
      setValidateErr('');
      const timeout = setTimeout(() => {
        dispatch(
          checkContactBeforeVerify('phone_number', phoneNumber, countryCode)
        );
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [phoneNumber]);

  // change step
  useEffect(() => {
    if (successVerify) {
      dispatch(changeVerifyStep('VerifyCodeForm'));
    }
  }, [successVerify]);

  // loading button
  useEffect(() => {
    if (loadingCheck || loadingVerify) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCheck, loadingVerify]);

  // disable button
  useEffect(() => {
    if (!successCheck || errorCheck || validateErr || !(phoneNumber || email)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [validateErr, email, phoneNumber, errorCheck, errorVerify, successCheck]);

  // email changes
  const handleChangeEmail = (event) => {
    dispatch({ type: USER_VERIFY_RESET });
    setEmail(event.target.value);
    setPhoneNumber(countryCode);
  };

  // phone changes
  const handleChangePhoneNumber = (input, data, event, formattedValue) => {
    dispatch({ type: USER_VERIFY_RESET });
    setEmail('');
    setPhoneNumber(formattedValue);
    setCountryCode(data.countryCode);
  };

  const validateTheEmail = async () => {
    dispatch(checkContactBeforeVerify('email', email, countryCode));
    if (!errorCheck) {
      dispatch(verifyUser('email', email, countryCode));
    }
  };

  const validateThePhone = async () => {
    dispatch(
      checkContactBeforeVerify('phone_number', phoneNumber, countryCode)
    );
    if (!errorCheck) {
      const thePhoneNumber = phoneNumber.split(' ').join('');
      dispatch(verifyUser('phone_number', thePhoneNumber));
    }
  };

  const handleVerify = () => {
    if (validateErr === '') {
      if (email !== '') {
        console.log('verifying email...');
        validateTheEmail();
      } else if (email === '') {
        console.log('verifying phone number...');
        validateThePhone();
      }
    } else {
      setValidateErr('verification logic error');
    }
  };

  const handleClick = () => {
    if (!(phoneNumber || email)) {
      setValidateErr(t(contents.fillOne));
    } else {
      console.log('verifying...');
      handleVerify();
    }
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Back to="/intro" />
      <Grid item xs={12}>
        <img
          src="/images/register.svg"
          width="100%"
          style={{ paddingBottom: '20px' }}
          className={classes.root}
          alt="register"
        />
      </Grid>
      <Grid item xs={12} sx={{ direction: 'ltr' }}>
        <FormControl variant="outlined">
          <PhoneInput
            specialLabel={t('placeholder.phoneNumber')}
            country="ir"
            value={phoneNumber}
            disableDropdown="false"
            onChange={handleChangePhoneNumber}
            inputProps={{
              name: 'phone',
            }}
            defaultMask="... ... .. ..."
            countryCodeEditable={false}
          />
          <Divider sx={{ marginTop: 4, marginBottom: 4 }}>
            <Typography variant="subtitle1">{t('divider.register')}</Typography>
          </Divider>
          <TextField
            type="email"
            id="outlined-adornment-email"
            label={t('placeholder.email')}
            value={email}
            onChange={handleChangeEmail}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'email',
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 8 }}>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={isDisabled}
          loading={isLoading}
          sx={{ bottom: 5 }}
        >
          {t('button.submit')}
        </LoadingButton>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1">
          <Trans i18nKey="join.alreadyJoined">
            If already joined tap
            <Link to="/Login">here</Link>
          </Trans>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {(validateErr || errorVerify || errorCheck) && (
          <Message
            backError={errorCheck}
            frontError={errorVerify}
            variant="filled"
            severity="error"
          >
            {validateErr}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default EntryForm;
