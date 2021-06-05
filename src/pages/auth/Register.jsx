import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import EntryForm from '../../components/register/EntryForm';
import VerifyCodeForm from '../../components/register/VerifyCodeForm';
import Success from '../../components/Message';

const Register = () => {
  const verifyStep = useSelector((state) => state.verifyStep);
  const { step } = verifyStep;

  const switchComponent = () => {
    switch (step) {
      case 'EntryForm':
        return (
          <>
            <Grid item xs={12} sx={{ marginTop: 36 }}>
              <EntryForm />
            </Grid>
          </>
        );
      case 'VerifyCodeForm':
        return (
          <>
            <Grid item xs={12} sx={{ marginTop: 36 }}>
              <VerifyCodeForm />
            </Grid>
          </>
        );
      case '3':
        return console.log('3');
      case '4':
        return <Success />;
      default:
        return (
          <Grid item xs={12} sx={{ marginTop: 36 }}>
            <EntryForm />
          </Grid>
        );
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      {switchComponent()}
    </Grid>
  );
};

export default Register;
