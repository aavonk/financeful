import React from 'react';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { ModalRoot, ModalBody } from '@Components/LargeModal';

import CategoryChoiceView from './Views/CategoryChoiceView';
import BudgetAmountsView from './Views/BudgetAmountsView';
import ReviewAndSaveView from './Views//ReviewAndSaveView';
import {
  Stepper,
  BackButton,
  NextButton,
  StepContent,
  StepperProvider,
} from '@Common/Stepper';
import { ButtonGroup } from './style';
import Button from '@Common/Button';

function CreateBudgetModal() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button variant="primary" onClick={open}>
        Budget Modal
      </Button>
      <ModalRoot isOpen={isOpen} onDismiss={close} aria-label="Create a budget">
        <ModalBody>
          <StepperProvider
            steps={['Choose Categories', 'Set Budget Amounts', 'Review & Save']}
          >
            <ButtonGroup>
              <BackButton />
              <NextButton
                validate
                errorMessage="Please select at least 1 category"
                validator={() => selected.length > 0}
              />
            </ButtonGroup>
            <Stepper />
            <StepContent
              content={[
                <CategoryChoiceView />,
                <BudgetAmountsView />,
                <ReviewAndSaveView />,
              ]}
            />
          </StepperProvider>
        </ModalBody>
      </ModalRoot>
    </>
  );
}

export default CreateBudgetModal;
