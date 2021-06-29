import React from 'react';
import { useHistory } from 'react-router-dom';
import { Left, Right, ContentContainer } from '@Components/Layout/styles';
import Button from '@Common/Button';
import {
  getCurrentYear,
  addDays as addDuration,
  getMonthName,
} from '@Lib/date-formatting';
import { CreateBudgetProvider } from '@Context/create-budget/createBudgetContext';
import CreateBudgetController from '@Modules/budget/BudgetCreation/CreateBudgetController';
import BudgetController from '@Modules/budget/BudgetController';

function BudgetPage() {
  const month = getMonthName(addDuration(new Date(), { months: 1 }));
  const year = getCurrentYear();
  const history = useHistory();

  return (
    <ContentContainer>
      <Left>
        <BudgetController />
      </Left>
      <Right>
        <Button
          variant="primary"
          data-testid="budget-create-button"
          onClick={() => history.push(`/budget/create?month=${month}&year=${year}`)}
          fullWidth
        >
          {`Create ${month} budget`}
        </Button>
        <div>
          <CreateBudgetProvider>
            <CreateBudgetController />
          </CreateBudgetProvider>
        </div>
      </Right>
    </ContentContainer>
  );
}

export default BudgetPage;
