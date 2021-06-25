import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { ModalRoot, ModalBody } from '@Components/LargeModal';

import CategoryChoiceView from './Views/CategoryChoiceView';
import BudgetAmountsView from './Views/BudgetAmountsView';
import ReviewAndSaveView from './Views/ReviewAndSaveView';
import BUdgetAmountsViewV2 from './Views/BudgetAmountsViewV2';
import {
  Stepper,
  BackButton,
  NextButton,
  StepContent,
  StepperProvider,
} from '@Common/Stepper';
import { ButtonGroup } from './style';
import { useQuery } from '@Hooks/useQuery';
import { PageHeader } from './style';

function CreateBudgetModal() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const history = useHistory();
  const query = useQuery();
  const month = query.get('month');
  const year = query.get('year');

  const open = () => history.push('/budget/create');
  const close = () => history.push('/budget');

  return (
    <>
      <ModalRoot
        isOpen={history.location.pathname === '/budget/create'}
        onDismiss={close}
        aria-label="Create a budget"
      >
        <ModalBody>
          <StepperProvider
            steps={['Choose Categories', 'Set Budget Amounts', 'Review & Save']}
          >
            <PageHeader>
              <h2>{`${month} ${year} Budget`}</h2>
              <ButtonGroup>
                <BackButton />
                <NextButton
                  validate
                  errorMessage="Please select at least 1 category"
                  validator={() => selected.length > 0}
                />
              </ButtonGroup>
            </PageHeader>
            <Stepper />
            <StepContent
              content={[
                <CategoryChoiceView />,
                <BUdgetAmountsViewV2 />,
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
