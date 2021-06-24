import React from 'react';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';

function ReviewAndSaveView() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  return <div>{JSON.stringify(selected, null, 2)}</div>;
}

export default ReviewAndSaveView;
