import React from 'react';
import { useHistory } from 'react-router-dom';
import { Left, Right, ContentContainer } from '@Components/Layout/styles';
import Button from '@Common/Button';
import {
  getCurrentMonthName,
  getCurrentYear,
  addDays as addDuration,
  getMonthName,
} from '@Lib/date-formatting';
import CreateBudgetModal from '@Modules/budget/BudgetCreation/CreateBudgetModal';
import { CreateBudgetProvider } from '@Context/create-budget/createBudgetContext';

function BudgetPage() {
  const month = getMonthName(addDuration(new Date(), { months: 1 }));
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
        <div>
          <CreateBudgetProvider>
            <CreateBudgetModal />
          </CreateBudgetProvider>
        </div>
      </Right>
    </ContentContainer>
  );
}

export default BudgetPage;
