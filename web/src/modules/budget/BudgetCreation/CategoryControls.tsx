import React from 'react';
import Button from '@Common/Button';
import { ControlsContainer } from './style';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';

function CategoryControls() {
  const { routeToSelected } = useCreateBudgetContext();
  return (
    <ControlsContainer>
      <Button variant="dark" onClick={routeToSelected} fullWidth>
        Move &gt;&gt;
      </Button>
      <Button variant="dark" onClick={() => alert('all')} fullWidth>
        Select All
      </Button>
    </ControlsContainer>
  );
}

export default CategoryControls;
