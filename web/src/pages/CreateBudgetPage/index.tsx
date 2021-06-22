import React from 'react';
import { StepperProvider } from '@Common/Stepper';
import { CreateBudgetProvider } from '@Context/create-budget/createBudgetContext';
import { ContentContainer } from '@Components/Layout/styles';
import CreateBudgetSteps from '@Modules/budget/BudgetCreation/CreateBudgetSteps';

function CreateBudgetPage() {
  return (
    <CreateBudgetProvider>
      <StepperProvider
        steps={['Choose Categories', 'Set Budget Amounts', 'Review & Save']}
      >
        <ContentContainer style={{ flexDirection: 'column' }}>
          <CreateBudgetSteps />
        </ContentContainer>
      </StepperProvider>
    </CreateBudgetProvider>
  );
}

export default CreateBudgetPage;
