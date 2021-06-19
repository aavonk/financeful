import React from 'react';
import { useQuery } from '@Hooks/useQuery';
import { SectionTitle } from '@Components/Layout/styles';
import {
  StepperProvider,
  Stepper,
  BackButton,
  NextButton,
  StepContent,
} from '@Common/Stepper';

function CreateBudgetPage() {
  const query = useQuery();
  const month = query.get('month');
  const year = query.get('year');

  return (
    <StepperProvider steps={['Choose Categories', 'Set Budget Amounts', 'Review & Save']}>
      <SectionTitle as="h2">{`${month} Budget`}</SectionTitle>
      <Stepper />
      <StepContent
        content={[<div>Hi Ther</div>, <div>Second One</div>, <div>Third one</div>]}
      />

      <div style={{ marginTop: '40px' }}>
        <BackButton />
        <NextButton
          fnBeforeStep={() => console.log('hi')}
          onComplete={() => {
            alert('Done');
          }}
        />
      </div>
    </StepperProvider>
  );
}

export default CreateBudgetPage;
