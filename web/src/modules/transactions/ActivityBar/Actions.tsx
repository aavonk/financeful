import React from 'react';
import { Searchbox } from '@Modules/transactions/Table';
import TransactionFormController from '@Modules/transactions/Forms/TransactionForm/TransactionFormController';
import { ActionsWrapper } from './style';

type Props = {
  disableSearch?: boolean;
  disableButton?: boolean;
};

function Actions({ disableSearch, disableButton }: Props) {
  return (
    <>
      <ActionsWrapper>
        {disableSearch ? null : <Searchbox />}
        <TransactionFormController fullWidth disableButton={disableButton} />
      </ActionsWrapper>
    </>
  );
}

export default Actions;
