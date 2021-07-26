import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import contents from '../inputsValidation/Contents';

export default function Message({
  icon,
  input,
  frontError,
  backError,
  variant,
  children,
  severity,
}) {
  const { t } = useTranslation();

  const onRequestCheck = () => {
    if (frontError.status) {
      if (frontError.status === 400) {
        return t(contents.wrongUserOrPass);
      }
      if (frontError.status === 422 && input === 'userName') {
        return t(contents.usernameExists);
      }
      if (frontError.status === 422 && input === 'email') {
        return t(contents.emailExists);
      }
      if (frontError.status === 422 && input === 'phoneNumber') {
        return t(contents.phoneExists);
      }
      if (frontError.status === 429) {
        return t(contents.manyRequest);
      }
      if (frontError.status === 499) {
        return t(contents.codeExpired);
      }
      return t(contents.sthIsWrong);
    }
    if (backError.status) {
      if (frontError.status === 710) {
        return t(contents.wrongUsername);
      }
      if (backError.status === 711) {
        return t(contents.usernameExists);
      }
      if (backError.status === 720) {
        return t(contents.wrongEmail);
      }
      if (backError.status === 721) {
        return t(contents.emailExists);
      }
      if (backError.status === 730) {
        return t(contents.wrongPhone);
      }
      if (backError.status === 731) {
        return t(contents.phoneExists);
      }
      if (backError.status === 400) {
        return t(contents.wrongCode);
      }
    }
  };
  return (
    <Alert icon={icon} variant={variant} severity={severity}>
      {children || onRequestCheck()}
    </Alert>
  );
}

Message.propTypes = {
  icon: PropTypes.node,
  input: PropTypes.string,
  frontError: PropTypes.object,
  backError: PropTypes.object,
  variant: PropTypes.string.isRequired,
  children: PropTypes.string,
  severity: PropTypes.string.isRequired,
};

Message.defaultProps = {
  icon: <CheckCircleOutlineIcon fontSize="inherit" />,
  input: '',
  frontError: {},
  backError: {},
  children: '',
};
