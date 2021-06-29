import React from 'react';
import Button from '@Common/Button';
import { ControlsContainer } from './style';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';

function CategoryControls() {
  const { routeToSelected, selectAll, removeAllSelected } = useCreateBudgetContext();
  return (
    <ControlsContainer>
      <Button
        variant="dark"
        onClick={routeToSelected}
        fullWidth
        className="fixed-on-mobile"
      >
        Add Selected
      </Button>
      <Button variant="dark" onClick={selectAll} fullWidth>
        Select All
      </Button>
      <Button variant="dark" onClick={removeAllSelected} fullWidth>
        Remove All
      </Button>
    </ControlsContainer>
  );
}

export default CategoryControls;
