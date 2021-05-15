/* eslint-disable react/display-name */
import React, { useState, useMemo } from 'react';
import { Column, Cell } from 'react-table';
import { useParams } from 'react-router-dom';
import { getDateRange, formatDate } from '@Lib/date-formatting';
import { useGetTransactionsRangeQuery, Transaction } from '@Generated/graphql';
import TransactionTable from '@Modules/transactions/Table';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

type DateRangeState = {
  startDate: Date;
  endDate: Date;
};

function RecentTransactions() {
  const { id } = useParams<{ id: string }>();
  const [{ startDate, endDate }] = useState<DateRangeState>(() =>
    getDateRange('current-month'),
  );
  const { data, loading, error } = useGetTransactionsRangeQuery({
    variables: { input: { startDate, endDate }, accountId: id },
  });

  const columns = useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }: Cell<Transaction>) => {
          return <span>{formatDate(value, 'MMM do yyyy')}</span>;
        },
      },
      {
        Header: 'Payee',
        accessor: 'payee',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: () => <span className="align-right">Amount</span>,
        accessor: 'amount',
        Cell: ({ value }: Cell<Transaction>) => {
          return <div className="number">{formatMoneyFromCentsToDollars(value)}</div>;
        },
      },
    ],
    [],
  );

  if (!data) {
    return null;
  }

  if (loading) {
    return null;
  }
  if (error) {
    console.error(error);
    return null;
  }

  return (
    <TransactionTable
      withPagination={false}
      withToolbar={false}
      columns={columns}
      data={data.getTransactionsRange}
      elevate={false}
    />
  );
}

export default RecentTransactions;
