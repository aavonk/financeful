import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  ModifiedCategory,
  useCreateBudgetContext,
} from '@Context/create-budget/createBudgetContext';
import { ModalRoot, ModalBody } from '@Components/LargeModal';
import CategoryChoiceView from './Views/CategoryChoiceView';
import BudgetAmountsView from './Views/BudgetAmountsView';
import ReviewAndSaveView from './Views/ReviewAndSaveView';
import {
  Stepper,
  BackButton,
  NextButton,
  StepContent,
  StepperProvider,
} from '@Common/Stepper';
import type { StepType } from '@Common/Stepper';
import { ButtonGroup } from './style';
import { useQuery } from '@Hooks/useQuery';
import { PageHeader } from './style';

type Props = {
  onComplete: () => void;
};

const validateBudetAmounts = (categories: ModifiedCategory[]) => {
  const invalidItems = categories.filter((i) => i.isValid === false);
  const invalid = invalidItems.length > 0;

  return !invalid;
};

function CreateBudgetModal({ onComplete }: Props) {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const history = useHistory();
  const query = useQuery();
  const month = query.get('month');
  const year = query.get('year');

  const close = () => history.push('/budget');

  const steps: StepType = [
    {
      label: 'Choose Categories',
      content: <CategoryChoiceView />,
      validate: true,
      canProceed: () => selected.length > 0,
      errorMessage: 'Please select at least 1 category',
    },
    {
      label: 'Set Budget Amounts',
      content: <BudgetAmountsView />,
      validate: true,
      canProceed: () => validateBudetAmounts(selected),
      errorMessage: 'Please use the correct format -- 1,200.00',
    },
    {
      label: 'Review & Save',
      content: <ReviewAndSaveView />,
    },
  ];

  return (
    <>
      <ModalRoot
        isOpen={history.location.pathname === '/budget/create'}
        onDismiss={close}
        aria-label="Create a budget"
      >
        <ModalBody>
          <StepperProvider steps={steps} onComplete={onComplete}>
            <PageHeader>
              <h2>{`${month} ${year} Budget`}</h2>
              <ButtonGroup>
                <BackButton />
                <NextButton />
              </ButtonGroup>
            </PageHeader>
            <Stepper />
            <StepContent />
          </StepperProvider>
        </ModalBody>
      </ModalRoot>
    </>
  );
}

export default CreateBudgetModal;
