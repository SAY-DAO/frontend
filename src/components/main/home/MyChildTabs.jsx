/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import GoneModal from '../../modals/GoneModal';
import ChildFamily from '../../child/ChildFamily';
import ChildNeeds from '../../child/ChildNeeds';
import ChildStory from '../../child/ChildStory';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      marginTop: theme.spacing(1),
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.root}>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MyChildTabs({ theChild }) {
  const { t } = useTranslation();

  const [isGone, setIsGone] = useState(false);
  const [value, setValue] = useState(0);
  const [userRole, setUserRole] = useState();

  // setFamily and userRole
  useEffect(() => {
    if (theChild.userRole) {
      setUserRole(theChild.userRole);
    }
  }, [userRole, theChild]);

  // child is gone
  useEffect(() => {
    if (theChild.is_gone) {
      setIsGone(true);
    }
    return () => {
      setIsGone(false);
    };
  }, [theChild]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{ backgroundColor: 'white' }}
          >
            <Tab
              label={
                <Typography variant="subtitle2">
                  {t('childPage.childTab.requirements')}
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant="subtitle2">
                  {t('childPage.childTab.family')}
                </Typography>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Typography variant="subtitle2">
                  {t('childPage.childTab.story')}
                </Typography>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ChildNeeds theChild={theChild} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChildFamily theChild={theChild} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ChildStory theChild={theChild} />
        </TabPanel>
      </Box>
      {/* Gone warn popup */}
      <GoneModal isGone={isGone} childSayName={theChild.sayName} />
    </>
  );
}

MyChildTabs.propTypes = {
  theChild: PropTypes.object,
};
