/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { Button, IconButton, StepLabel } from '@mui/material/';
import LoadingButton from '@material-ui/lab/LoadingButton';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchOneNeedReceipts } from '../../actions/childAction';

const ColorLibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, #f2a367 0%, #f2a367 50%, #f2a367 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, #f2a367 0%,#f2a367 50%, #f2a367 100%)',
  }),
}));

const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,#f2a367 0%,#f2a367 50%,#f2a367 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,#f2a367 0%,#f2a367 50%,#f2a367 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function ColorLibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: (
      <IconButton>
        <img
          src="/images/icons/doneNeeds/hand.svg"
          alt="hand icon"
          style={{ width: '28px' }}
        />
      </IconButton>
    ),
    2: (
      <IconButton>
        <img
          src="/images/icons/doneNeeds/package.svg"
          alt="package icon"
          style={{ width: '28px' }}
        />
      </IconButton>
    ),
    3: (
      <IconButton>
        <img
          src="/images/icons/doneNeeds/ngo.svg"
          alt="ngo icon"
          style={{ width: '28px' }}
        />
      </IconButton>
    ),
    4: (
      <IconButton>
        <img
          src="/images/icons/doneNeeds/child.svg"
          alt="child icon"
          style={{ width: '28px' }}
        />
      </IconButton>
    ),
  };
  return (
    <ColorLibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorLibStepIconRoot>
  );
}

ColorLibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

export default function HorizontalNonLinearStepper({ oneNeed }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = React.useState(t('needStatus.0'));
  const [completed, setCompleted] = React.useState({});
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([
    t('needStatus.0'),
    t('needStatus.p1'),
    t('needStatus.p2'),
    t('needStatus.p3'),
  ]);

  const ChildOneNeedReceipt = useSelector((state) => state.ChildOneNeedReceipt);
  const { receipt, loading, error, success } = ChildOneNeedReceipt;

  useEffect(() => {
    if (!success && oneNeed) {
      dispatch(fetchOneNeedReceipts(oneNeed.id));
    }
    if (oneNeed && oneNeed.type === 1) {
      setSteps([
        t('needStatus.0'),
        t('needStatus.p1'),
        t('needStatus.p2'),
        t('needStatus.p3'),
      ]);
    } else {
      setSteps([t('needStatus.0'), t('needStatus.s1'), t('needStatus.s2')]);
    }
  }, [oneNeed, success, step]);

  useEffect(() => {
    if (oneNeed && oneNeed.status === 2) {
      setStep(0);
    } else if (oneNeed && oneNeed.status === 3) {
      setStep(3);
    } else if (oneNeed && oneNeed.status === 5) {
      setStep(3);
    }
  }, [oneNeed]);

  const handleStep = (chosenStep) => () => {
    if (chosenStep > step) {
      setActiveStep(steps[step]);
    } else {
      setActiveStep(steps[chosenStep]);
    }
  };

  const handleReceiptPage = () => {
    history.push('/child/needs/needPage/report');
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<ColorLibConnector />}
      >
        {steps &&
          steps[0] &&
          steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel
                color="inherit"
                onClick={handleStep(index)}
                StepIconComponent={ColorLibStepIcon}
              />
            </Step>
          ))}
      </Stepper>
      <LoadingButton
        variant="contained"
        fullWidth
        sx={{ marginTop: 3, marginBottom: 2 }}
        onClick={handleReceiptPage}
      >
        {activeStep}
      </LoadingButton>
    </Box>
  );
}

HorizontalNonLinearStepper.propTypes = {
  oneNeed: PropTypes.object,
};