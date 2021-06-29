import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@Common/Paper';
import { GeneralEmptyView } from '@Components/EmptyViews';
import Button from '@Common/Button';
import { getCurrentMonthName, getCurrentYear } from '@Lib/date-formatting';

function NoBudgetView() {
  const history = useHistory();
  const month = getCurrentMonthName();
  const year = getCurrentYear();
  const paperStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
  };

  return (
    <Paper style={paperStyles}>
      <GeneralEmptyView
        containerHeight="180px"
        heading="Uh oh. Doesn't look like you have a budget for this month yet."
        subheading="Want to start one? When you do, you'll see it here. "
      />
      <Button
        variant="primary"
        onClick={() => history.push(`/budget/create?month=${month}&year=${year}`)}
      >{`Start ${month} budget`}</Button>
    </Paper>
  );
}

export default NoBudgetView;
