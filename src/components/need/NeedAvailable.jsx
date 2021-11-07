/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import Back from '../Back';
import Message from '../Message';
import NeedPageTop from './NeedPageTop';
import NeedPageProduct from './NeedPageProduct';
import Donation from '../payment/DonationPercentage';
import Wallet from '../payment/Wallet';
import { addToCart } from '../../actions/main/cartAction';

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    right: 0,
    minHeight: '290px',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'linear-gradient(to bottom,rgba(255, 255, 255, 0) 80%, #f7f7f7 100%),url("/images/child/background.png")',
    margin: 0,
    padding: 0,
  },

  needAvatar: {
    width: 100,
    height: 100,
    top: '20%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f9d6af',
    boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
  },
  needName: {
    color: 'white',
    top: '31%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  sayName: {
    color: 'white',
    top: '34%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  needDesc: {
    color: '#8c8c8c',
    top: '40%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, 0%)',
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
  },
});

export default function NeedAvailable({ childId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState('addToCart');
  const [amount, setAmount] = useState(0);
  const [unpayable, setUnpayable] = useState(false);
  const [paySomeDisable, setPaySomeDisable] = useState(false);
  const [bankMinDisable, setBankMinDisable] = useState(false);
  const [payLimit, setPayLimit] = useState('');
  const [inputError, setInputError] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [inCart, setInCart] = useState(false);

  const myChild = useSelector((state) => state.myChild);
  const { theChild } = myChild;

  const theCart = useSelector((state) => state.theCart);
  const {
    cartItems,
    loading: loadingCartItems,
    success: successCartItems,
  } = theCart;

  const payment = useSelector((state) => state.payment);
  const { result, loading: loadingPayment, success: successPayment } = payment;

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const {
    oneNeed,
    loading: loadingOneNeed,
    error: errorOneNeed,
    success: successOneNeed,
  } = ChildOneNeed;

  // loading button
  useEffect(() => {
    if (loadingOneNeed || loadingCartItems) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingOneNeed, loadingCartItems]);

  // disable button
  useEffect(() => {
    if (successOneNeed && amount <= remaining) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [successOneNeed, amount, remaining]);

  // In case the child is not in the state
  useEffect(() => {
    if (!theChild) {
      history.push('/main/home');
    }
  }, [theChild, history]);

  // get the initial remaining cost
  useEffect(() => {
    if (oneNeed) {
      setRemaining(oneNeed.cost - oneNeed.paid);
    }
  }, [oneNeed]);

  // check if Unpayable
  useEffect(() => {
    if (oneNeed && oneNeed.unpayable) {
      setUnpayable(true);
    }
  }, [oneNeed]);

  // do not allow paySome method when cost < 20000
  useEffect(() => {
    if (oneNeed) {
      if (oneNeed && (oneNeed.type === 0 || oneNeed.cost >= 20000)) {
        setPaySomeDisable(false);
      } else {
        setPaySomeDisable(true);
      }
    }
  }, [oneNeed]);

  // bank minimum
  useEffect(() => {
    if (amount < 1000) {
      setBankMinDisable(true);
      setInputError(true);
    } else {
      setInputError(false);
      setBankMinDisable(false);
    }
  }, [amount]);

  // payLimit
  useEffect(() => {
    if (oneNeed && remaining < 2000) {
      setPayLimit(remaining.toString());
    }
    setPayLimit('1000');
  }, [oneNeed, remaining]);

  // set amount
  useEffect(() => {
    if (method === 'paySome') {
      setAmount(remaining);
    } else {
      setAmount(remaining);
    }
  }, [method, remaining]);

  // cart
  useEffect(() => {
    console.log(inCart);
    if (cartItems[0] && oneNeed) {
      const existItem = cartItems.find((x) => x.needId === oneNeed.id);
      if (existItem) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  }, [cartItems, oneNeed]);

  // radio button / setAmount
  const handleMethodChange = (event) => {
    if (event.target.value === 'payAll') {
      setMethod('payAll');
      setAmount(remaining);
    } else if (event.target.value === 'paySome') {
      setMethod('paySome');
      setAmount(remaining);
    } else if (event.target.value === 'addToCart') {
      setMethod('addToCart');
    }
  };

  // paySome input
  const handlePaySomeInput = (e) => {
    const inputAmount = e.target.value;
    setAmount(Number(inputAmount));
  };

  // addToCard
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(theChild, oneNeed, amount));
  };

  // addToCard
  const handleContinueShop = (e) => {
    e.preventDefault();
    history.push(`/child/${theChild.id}`);
  };

  const handlePayment = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();
  return (
    <>
      <Grid container direction="column">
        {theChild && oneNeed && (
          <Grid item xs={12} className={classes.root}>
            <Back isOrange={false} to={`/child/${childId}`} />
            <Grid item xs={12}>
              <>
                <div style={{ minHeight: '350px' }} />

                <Avatar
                  className={classes.needAvatar}
                  alt={`${oneNeed.sayName}`}
                  src={oneNeed.imageUrl}
                />
                <Typography className={classes.needName} variant="subtitle1">
                  {oneNeed.name}
                </Typography>
                <Typography className={classes.sayName} variant="subtitle2">
                  {theChild.sayName}
                </Typography>

                <Box>
                  <Grid container className={classes.needDesc}>
                    <Grid
                      sx={{
                        marginLeft: 3,
                        marginRight: 3,
                      }}
                    >
                      <NeedPageTop oneNeed={oneNeed} />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      sx={{ marginTop: 5, padding: 2 }}
                    >
                      <Grid item xs={3}>
                        <Typography variant="subtitle2">
                          {t('needPage.needInfo')}
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Divider sx={{ width: '95%', margin: 1 }} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <NeedPageProduct oneNeed={oneNeed} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ marginTop: 5, padding: 0, textAlign: 'center' }}
                    >
                      <Grid item xs={3}>
                        <Typography variant="subtitle2">
                          {t('needPage.payTitle')}
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Divider sx={{ width: '95%' }} />
                      </Grid>
                    </Grid>
                    <Grid item sx={{ margin: 1 }}>
                      <Typography variant="body2" sx={{ margin: 1 }}>
                        {t('needPage.payContent')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        error={inputError}
                        required
                        component="fieldset"
                        variant="standard"
                        sx={{ width: '100%' }}
                        onSubmit={
                          !inCart && method === 'addToCart'
                            ? (e) => handleAddToCart(e)
                            : inCart
                            ? (e) => handleContinueShop(e)
                            : handlePayment
                        }
                      >
                        <form
                          style={{
                            width: '100%',
                            paddingLeft: 20,
                            paddingRight: 20,
                          }}
                        >
                          <FormGroup>
                            <RadioGroup
                              name="controlled-radio-buttons-group"
                              value={method}
                              onChange={handleMethodChange}
                            >
                              <FormControlLabel
                                value="addToCart"
                                control={<Radio />}
                                label={t('needPage.addToCart')}
                              />
                              <FormControlLabel
                                disabled={inCart}
                                value="payAll"
                                control={<Radio />}
                                label={t('needPage.payAll')}
                              />
                              <FormControlLabel
                                disabled={paySomeDisable || inCart}
                                value="paySome"
                                control={<Radio />}
                                label={t('needPage.paySome')}
                              />
                            </RadioGroup>
                          </FormGroup>
                          {method === 'paySome' ? (
                            <>
                              <OutlinedInput
                                sx={{ direction: 'rtl' }}
                                type="number"
                                id="filled-someAmount"
                                value={amount}
                                onChange={handlePaySomeInput}
                                startAdornment={
                                  <InputAdornment
                                    color="primary"
                                    position="start"
                                  >
                                    {t('currency.toman')}
                                  </InputAdornment>
                                }
                              />
                              {inputError && (
                                <FormHelperText
                                  id="outlined-paySome-helper-text"
                                  sx={{ color: 'red' }}
                                >
                                  {t('needPage.payWarningModal', {
                                    payLimit,
                                  })}
                                </FormHelperText>
                              )}

                              <Grid item xs={12}>
                                <Divider
                                  sx={{
                                    width: '80%',
                                    margin: 'auto',
                                    marginTop: 3,
                                    textAlign: 'center',
                                  }}
                                />
                              </Grid>
                              <Donation />
                              <Wallet />
                              <Grid sx={{ textAlign: 'center' }}>
                                <LoadingButton
                                  variant="contained"
                                  color="primary"
                                  disabled={isDisabled || bankMinDisable}
                                  loading={isLoading}
                                  sx={{ marginTop: 2, marginBottom: 4 }}
                                >
                                  {!isDisabled && !bankMinDisable && (
                                    <Typography
                                      component="span"
                                      variant="subtitle1"
                                      sx={{
                                        paddingRight: 2,
                                        color: 'white',
                                      }}
                                    >
                                      {amount.toLocaleString() +
                                        t('currency.toman')}
                                    </Typography>
                                  )}
                                  <Typography
                                    component="span"
                                    variant="subtitle1"
                                    sx={{
                                      color:
                                        isDisabled || bankMinDisable
                                          ? 'lightGrey'
                                          : 'white',
                                    }}
                                  >
                                    {t('button.pay')}
                                  </Typography>
                                </LoadingButton>
                              </Grid>
                            </>
                          ) : (
                            <>
                              {method === 'payAll' && (
                                <>
                                  <Grid item xs={12}>
                                    <Divider
                                      sx={{
                                        width: '80%',
                                        margin: 'auto',
                                        textAlign: 'center',
                                      }}
                                    />
                                  </Grid>
                                  <Donation />
                                  <Wallet />
                                </>
                              )}
                              <Grid sx={{ textAlign: 'center' }}>
                                <LoadingButton
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  disabled={isDisabled}
                                  loading={isLoading}
                                  sx={{ marginTop: 1, marginBottom: 4 }}
                                >
                                  <Typography
                                    component="span"
                                    variant="subtitle1"
                                    sx={{
                                      paddingRight: method === 'payAll' && 2,
                                      color: 'white',
                                    }}
                                  >
                                    {method === 'payAll' &&
                                      amount.toLocaleString() +
                                        t('currency.toman')}
                                  </Typography>
                                  <Typography
                                    component="div"
                                    variant="subtitle1"
                                    sx={{
                                      color: 'white',
                                      display: 'contents',
                                    }}
                                  >
                                    {method === 'payAll' ? (
                                      t('button.pay')
                                    ) : (
                                      <>
                                        <span style={{ padding: 5 }}>
                                          {!inCart
                                            ? t('button.addToCart')
                                            : t('button.continueShopping')}
                                        </span>
                                        <span>
                                          {!inCart && (
                                            <img
                                              src="/images/cartWhite.svg"
                                              alt="Cart Icon"
                                              style={{
                                                maxWidth: '22px',
                                              }}
                                            />
                                          )}
                                        </span>
                                      </>
                                    )}
                                  </Typography>
                                </LoadingButton>
                              </Grid>
                            </>
                          )}
                        </form>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorOneNeed && (
          <Message backError={errorOneNeed} variant="filled" severity="error" />
        )}
      </Grid>
    </>
  );
}

NeedAvailable.propTypes = {
  childId: PropTypes.string,
};