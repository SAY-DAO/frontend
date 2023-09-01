import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

const env = process.env.REACT_APP_NODE_ENV || 'development';

let envApiUrl = '';
let envApiUrl3 = '';
let envApiDao = '';

if (env === 'production') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v3`;
  envApiDao = `https://${process.env.REACT_APP_DAO_PROD}/api/dao`;
} else if (env === 'staging') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAGING}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_STAGING}/api/v3`;
  envApiDao = `https://${process.env.REACT_APP_DAO_STAGING}/api/dao`;
} else if (env === 'development') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v3`;
  envApiDao = `http://${process.env.REACT_APP_DAO_LOCAL}/api/dao`;
} else {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v2`;
  envApiUrl3 = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v3`;
}

console.log('initiating Log Rocket ...');
const theUser = localStorage.getItem('userInfo');
LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ID, {
  id: theUser && JSON.parse(theUser).user.id,
  firstName: theUser && JSON.parse(theUser).user.firstName,
  lastName: theUser && JSON.parse(theUser).user.lastName,
  userName: theUser && JSON.parse(theUser).user.userName,
  // Add your own custom user variables here, ie:
  subscriptionType: 'Virtual Family',
});
console.log('Log Rocket initiated.');

setupLogRocketReact(LogRocket);

const apiUrl = envApiUrl;
const apiUrl3 = envApiUrl3;
const apiDao = envApiDao;
export { apiUrl, apiUrl3, apiDao };
