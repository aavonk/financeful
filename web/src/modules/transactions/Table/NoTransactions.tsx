import React from 'react';
import Paper from '@Common/Paper';
import TransactionForm from '@Modules/transactions/Forms/TransactionForm';
import { EmptyContainer } from './style';
import { ViewError } from '@Components/ErrorViews';

type Props = {
  heading?: string;
  subheading?: string;
};

const NoTransactions: React.FC<Props> = ({
  heading = 'No transactions yet!',
  subheading = "When you add some, you'll see them here.",
}) => {
  return (
    <Paper minHeight="450px">
      <EmptyContainer>
        <ViewError emoji="🤑" heading={heading} subheading={subheading} />
        <div style={{ marginTop: '1rem' }}>
          <TransactionForm />
        </div>
      </EmptyContainer>
    </Paper>
  );
};
export default NoTransactions;
