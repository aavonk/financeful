import React from 'react';
import Paper from '@Common/Paper';
import TransactionForm from '@Modules/transactions/TransactionForm';
import { EmptyContainer } from '../style';
import { ViewError } from '@Components/ErrorViews';
const NoTransactions: React.FC = () => {
  return (
    <Paper minHeight="450px">
      <EmptyContainer>
        <ViewError
          emoji="🤑"
          heading="No transactions yet!"
          subheading="When you add some, you'll see them here."
        />
        <div style={{ marginTop: '1rem' }}>
          <TransactionForm />
        </div>
      </EmptyContainer>
    </Paper>
  );
};
export default NoTransactions;
