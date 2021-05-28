import React from 'react';
import { Searchbox } from '@Modules/transactions/Table';
import TransactionFormController from '@Modules/transactions/Forms/TransactionForm/TransactionFormController';
import { ActionsWrapper } from './style';

function Actions() {
  return (
    <>
      <ActionsWrapper>
        <Searchbox />
        <TransactionFormController fullWidth />
      </ActionsWrapper>
    </>
  );
}

export default Actions;
