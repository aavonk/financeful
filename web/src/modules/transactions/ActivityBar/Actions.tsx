import React from 'react';
import { useHistory } from 'react-router-dom';
import { Searchbox } from '@Modules/transactions/Table';
import TransactionFormController from '@Modules/transactions/Forms/TransactionForm/TransactionFormController';
import { ActionsWrapper } from './style';
import Button from '@Common/Button';

type Props = {
  disableSearch?: boolean;
  disableButton?: boolean;
};

function Actions({ disableSearch, disableButton }: Props) {
  const history = useHistory();
  const isReviewPageVisible = history.location.pathname === '/transactions/uncategorized';
  return (
    <>
      <ActionsWrapper>
        {isReviewPageVisible && (
          <Button variant="dark" onClick={() => history.goBack()} fullWidth>
            Go back
          </Button>
        )}
        {disableSearch ? null : <Searchbox />}
        <TransactionFormController fullWidth disableButton={disableButton} />
      </ActionsWrapper>
    </>
  );
}

export default Actions;
