import React from 'react';
import { useHistory } from 'react-router-dom';
import { Left, Right, ContentContainer } from '@Components/Layout/styles';
import Button from '@Common/Button';
import { getCurrentMonthName, getCurrentYear } from '@Lib/date-formatting';
function BudgetPage() {
  const month = getCurrentMonthName();
  const year = getCurrentYear();
  const history = useHistory();

  return (
    <ContentContainer>
      <Left>Left Side!</Left>
      <Right>
        <Button
          variant="primary"
          data-testid="budget-create-button"
          onClick={() => history.push(`/budget/create?month=${month}&year=${year}`)}
          fullWidth
        >
          {`Create ${month} budget`}
        </Button>
      </Right>
    </ContentContainer>
  );
}

export default BudgetPage;
