import React from 'react';
import { ButtonGroup, PageHeader } from './style';
import { Stepper, BackButton, NextButton, StepContent } from '@Common/Stepper';
import { useQuery } from '@Hooks/useQuery';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import CategoryChoiceView from './CategoryChoiceView';
import BudgetAmountsView from './BudgetAmountsView';
import ReviewAndSaveView from './ReviewAndSaveView';

function CreateBudgetSteps() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
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
        content={[<CategoryChoiceView />, <BudgetAmountsView />, <ReviewAndSaveView />]}
      />
    </>
  );
}

export default CreateBudgetSteps;
