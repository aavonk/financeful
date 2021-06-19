import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MuiStepper, {
  StepperProps as MuiStepperProps,
} from '@bit/mui-org.material-ui.stepper';
import Step from '@bit/mui-org.material-ui.step';
import MuiStepIcon from '@bit/mui-org.material-ui.step-icon';
import StepConnector from '@bit/mui-org.material-ui.step-connector';
import MuiStepLabel from '@bit/mui-org.material-ui.step-label';
import Button from '@Common/Button';
import { makeStyles, withStyles } from '@bit/mui-org.material-ui.styles';
import { theme } from '@Constants/theme';
import { useQuery } from '@Hooks/useQuery';

// Override Material UI Styles ===================================================
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    backgroundColor: 'transparent',
    padding: '12px',
  },
});

const StepLabel = withStyles({
  alternativeLabel: {
    color: theme.colors.textSecondary,
    '&$active': {
      color: theme.colors.textPrimary,
      fontWeight: 700,
    },
    '&$completed': {
      color: theme.colors.primary,
    },
  },
  active: {},
  completed: {},
})(MuiStepLabel);

const StepIcon = withStyles({
  root: {
    color: theme.colors.border,
    '&$active': {
      color: theme.colors.primary,
    },
    '&$completed': {
      color: theme.colors.primary,
    },
  },
  text: {
    color: '#fff',
  },
  active: {},
  completed: {},
})(MuiStepIcon);

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: theme.colors.primary,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.colors.primary,
    },
  },
  line: {
    borderColor: theme.colors.border,
    borderTopWidth: 4,
    borderRadius: 2,
  },
})(StepConnector);

// Add ClassName Prop to Mui Stepper Component =================================
interface MUIStepperProps extends MuiStepperProps {
  className?: string | Record<string, unknown>;
}
function MUIStepper(props: MUIStepperProps) {
  const { children, ...rest } = props;
  return <MuiStepper {...rest}>{children}</MuiStepper>;
}

// Context Setup  ==============================================================

type StepType = Array<string>;

type IStepperContext = {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  steps: StepType;
};

const StepperContext = React.createContext<IStepperContext | undefined>(undefined);

function useStepperContext() {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error('Stepper Context must be used within a StepperProvider');
  }
  return context;
}

type ProviderDefaultProps = {
  children: React.ReactNode;
  steps: StepType;
};

export function StepperProvider({ children, steps }: ProviderDefaultProps) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const value = { activeStep, handleNext, handleBack, steps };

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
}

// Build the Components  ==============================================================

export function Stepper() {
  const { activeStep, handleNext, handleBack, steps } = useStepperContext();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <MUIStepper
        activeStep={activeStep}
        alternativeLabel
        className={styles.container}
        connector={<QontoConnector />}
      >
        {steps.map((label) => {
          const stepProps: {
            completed?: boolean;
            className?: Record<string, unknown>;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
            </Step>
          );
        })}
      </MUIStepper>
    </div>
  );
}

type StepperContentProps = {
  content: Array<React.ReactNode>;
};
export function StepContent({ content }: StepperContentProps) {
  const { steps, activeStep } = useStepperContext();
  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return content[0];
      case 1:
        return content[1];
      case 2:
        return content[2];
      case 3:
        return content[3];
      case 4:
        return content[4];
      default:
        throw new Error('<Stepper /> only supports up to 5 Steps');
    }
  }

  return <div>{activeStep === steps.length ? null : getStepContent(activeStep)}</div>;
}

export function BackButton() {
  const { activeStep, handleBack } = useStepperContext();

  return (
    <Button variant="dark" onClick={handleBack} disabled={activeStep === 0}>
      Back
    </Button>
  );
}

type NextButtonProps = {
  fnBeforeStep?: () => void;
  onComplete?: () => void;
};

export function NextButton({ fnBeforeStep, onComplete }: NextButtonProps) {
  const { activeStep, handleNext, steps } = useStepperContext();

  const handleClick = () => {
    if (fnBeforeStep) {
      fnBeforeStep();
    }

    // On the last step. The button will say "Finish"
    if (activeStep === steps.length - 1) {
      return onComplete ? onComplete() : null;
    }
    handleNext();
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
    </Button>
  );
}
