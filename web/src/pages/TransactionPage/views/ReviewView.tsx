import React from 'react';
import { useGetUncategorizedTransactionsQuery } from '@Generated/graphql';
import { TableRows } from '@Modules/transactions/Table';
import { TableError } from '@Components/ErrorViews';

import type { Action } from '../transactionsPageReducer';
import type { Transaction } from '@Generated/graphql';

type Props = {
  dispatch: React.Dispatch<Action>;
};

function ReviewView({ dispatch }: Props) {
  const { data, loading, error } = useGetUncategorizedTransactionsQuery();

  if (loading) {
    console.log('loading');
  }

  if (error) {
    <TableError error={error} />;
  }

  React.useEffect(() => {
    if (data?.getUncategorizedTransactions) {
      dispatch({
        type: 'SET_DATA',
        payload: data.getUncategorizedTransactions as Transaction[],
      });
    }
  }, [data]);

  return (
    <>
      <TableRows
        stackedDisplayMobile={true}
        hoverable={true}
        getRowProps={(row) => ({
          onClick: () => {
            dispatch({
              type: 'SET_TRANSACTION',
              payload: row.original as Transaction,
            });
            dispatch({ type: 'TOGGLE_MODAL', payload: true });
          },
        })}
      />
    </>
  );
}

export default ReviewView;
