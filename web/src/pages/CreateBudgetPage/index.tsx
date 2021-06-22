import React from 'react';
import { useQuery } from '@Hooks/useQuery';
import {
  StepperProvider,
  Stepper,
  BackButton,
  NextButton,
  StepContent,
} from '@Common/Stepper';
import { PageHeader, ButtonGroup } from './style';
import CategoryChoice from '@Modules/budget/BudgetCreation/CategoryChoiceView';
import { CreateBudgetProvider } from '@Context/create-budget/createBudgetContext';

function CreateBudgetPage() {
  const query = useQuery();
  const month = query.get('month');
  const year = query.get('year');

  //TODO: Validate that there are selected categories before
  // going to step two

  return (
    <CreateBudgetProvider>
      <StepperProvider
        steps={['Choose Categories', 'Set Budget Amounts', 'Review & Save']}
      >
        <PageHeader>
          <h2>{`${month} ${year} Budget`}</h2>
          <ButtonGroup>
            <BackButton />
            <NextButton
              fnBeforeStep={() => console.log('hi')}
              onComplete={() => {
                alert('Done');
              }}
            />
          </ButtonGroup>
        </PageHeader>
        <Stepper />
        <StepContent
          content={[<CategoryChoice />, <div>Second One</div>, <div>Third one</div>]}
        />
      </StepperProvider>
    </CreateBudgetProvider>
  );
}

export default CreateBudgetPage;