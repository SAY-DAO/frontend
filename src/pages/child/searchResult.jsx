import React, { useState, useEffect } from 'react';
import { Link, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import VoiceBar from '../../components/searchResult/VoiceBar';
import InfoTabs from '../../components/searchResult/InfoTabs';
import Back from '../../components/Back';
import LeaveModel from '../../components/modals/LeaveModal';
import { CHILD_RANDOM_SEARCH_RESET } from '../../redux/constants/childConstants';
import { fetchUserDetails } from '../../redux/actions/userAction';

const SearchResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);
  const [imageHeight, setImageHeight] = useState('375px');
  const [backIsTrue, setBackIsTrue] = useState(false);

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const {
    theChild,
    error: errorRandomSearch,
    success: successRandomSearch,
  } = childRandomSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  // login
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      navigate(`/auth/login?redirect=search-result`);
    }
  }, [userInfo, successLogin, errorUserDetails]);

  useEffect(() => {
    if (!successRandomSearch) {
      dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
      navigate('/main/search');
    }
  }, [successRandomSearch]);

  // child age
  const getAge = (DOB) => {
    const today = new Date();
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  // child story more/less
  const handleMoreOrLess = () => {
    if (readLess) {
      setImageHeight('475px');
      setReadMore(true);
      setReadLess(false);
    }
    if (readMore) {
      setImageHeight('375px');
      setReadMore(false);
      setReadLess(true);
    }
  };

  const handleBack = () => {
    // leave modal pops up
    setBackIsTrue(true);
  };

  return (
    <>
      <Grid container sx={{ marginTop: 36 }}>
        <Back isOrange={false} handleClickOverride={handleBack} />

        <Grid item xs={12}>
          {!successRandomSearch ? (
            <CircularProgress />
          ) : (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  backgroundRepeat: 'round',
                  backgroundImage:
                    'linear-gradient(to bottom,rgba(255, 255, 255, 0) 60%, #f7f7f7 100%),url("/images/child/background.png")',
                  minHeight: imageHeight,
                }}
              />

              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  top: '20%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#f9d6af',
                  boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
                }}
                alt={`${theChild.sayName}`}
                src={theChild.avatarUrl}
              />
              <Typography
                sx={{
                  color: 'white',
                  top: '32%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}
                variant="subtitle1"
              >
                {theChild.sayName}
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  top: '35%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}
                variant="subtitle2"
              >
                {getAge(theChild.birthDate) + t('assets.age')}
              </Typography>
              <Box>
                <Grid
                  sx={{
                    color: '#8c8c8c',
                    top: '40%',
                    left: '50%',
                    position: 'absolute',
                    transform: 'translate(-50%, 0%)',
                    textAlign: 'center',
                    width: '100%',
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    <Typography variant="body2">
                      {readLess && theChild.bioSummary}
                      {readMore && theChild.bio}
                      <br />
                      <Link href="#" onClick={handleMoreOrLess}>
                        {readMore
                          ? t('assets.readMore.less')
                          : t('assets.readMore.more')}
                      </Link>
                    </Typography>
                  </Grid>

                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    {theChild && theChild.voiceUrl && (
                      <VoiceBar url={theChild.voiceUrl} />
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <InfoTabs />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Grid>
        {/* Leave warn popup */}
        <LeaveModel setBackIsTrue={setBackIsTrue} backIsTrue={backIsTrue} />
      </Grid>
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorRandomSearch && (
          <Message
            backError={errorRandomSearch}
            variant="standard"
            severity="error"
          />
        )}
      </Grid>
    </>
  );
};

export default SearchResult;