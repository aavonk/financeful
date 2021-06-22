import React from 'react';
import { ButtonGroup, PageHeader } from './style';
import { Stepper, BackButton, NextButton, StepContent } from '@Common/Stepper';
import { useQuery } from '@Hooks/useQuery';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import { useAlert } from '@Context/alert/alertContext';
import CategoryChoiceView from './CategoryChoiceView';

function CreateBudgetSteps() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const { showAlert } = useAlert();
  const query = useQuery();
  const month = query.get('month');
  const year = query.get('year');

  return (
    <>
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
        content={[<CategoryChoiceView />, <div>Second One</div>, <div>Third one</div>]}
      />
    </>
  );
}

export default CreateBudgetSteps;
