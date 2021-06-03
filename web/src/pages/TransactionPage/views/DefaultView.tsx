import React from 'react';
import { useGetTransactionsRangeQuery } from '@Generated/graphql';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';
import {
  TableRows,
  NoTransactionsView,
  TableSkeleton,
} from '@Modules/transactions/Table';
import { TableError } from '@Components/ErrorViews';
import TransactionsLoadingView from '../TransactionsLoadingView';
import type { Transaction } from '@Generated/graphql';
import type { Action, State } from '../transactionsPageReducer';

type Props = {
  dispatch: React.Dispatch<Action>;
  state: State;
};

function DefaultView({ dispatch, state }: Props) {
  const { range } = useDateRangeContext();
  const { data, error, loading } = useGetTransactionsRangeQuery({
    variables: { input: { startDate: range.startDate, endDate: range.endDate } },
  });

  React.useEffect(() => {
    dispatch({ type: 'SET_IS_DEFAULT_VIEW_LOADING', payload: loading });
  }, [loading]);

  React.useEffect(() => {
    if (data?.getTransactionsRange) {
      return dispatch({
        type: 'SET_DATA',
        payload: data.getTransactionsRange as Transaction[],
      });
    }
  }, [data]);

  if (loading) {
    return <TableSkeleton columns={6} rows={25} />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  if (!data?.getTransactionsRange?.length) {
    return <NoTransactionsView />;
  }

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

export default DefaultView;
