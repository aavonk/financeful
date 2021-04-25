/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { Column, Cell } from 'react-table';
import TransactionTable from '@Modules/transactions/Table';
import TableSkeleton from '@Modules/transactions/Table/TableSkeleton';
import TransactionTypeCell from '@Modules/transactions/Table/TransactionTypeCell';
import { Transaction } from '@Generated/graphql';
import { formatDate } from '@Lib/date-formatting';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

const testData = [
  {
    id: 'cknwkqkfu0290nwqs161chcp8',
    payee: 'aasdfasdf',
    date: '2021-04-25T02:50:08.625Z',
    amount: 123467,
    type: 'INCOME',
  },
  {
    id: 'cknwkq6nq0261nwqsv3wzl4od',
    payee: 'Heyoooooo',
    date: '2021-04-25T02:49:09.500Z',
    amount: 158979,
    type: 'INCOME',
  },
];
function RecentTransactions() {
  const loading = false;

  const columns = useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }: Cell<Transaction>) => {
          return <span>{formatDate(value, 'M/d/yyyy')}</span>;
        },
      },
      {
        Header: 'Payee',
        accessor: 'payee',
      },
      {
        Header: () => <span className="align-right">Amount</span>,
        accessor: 'amount',
        Cell: ({ value }: Cell<Transaction>) => {
          return <div className="number">{formatMoneyFromCentsToDollars(value)}</div>;
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: Cell<Transaction>) => {
          return <TransactionTypeCell type={value} />;
        },
      },
    ],
    [],
  );

  if (loading) {
    return <TableSkeleton rows={6} columns={4} />;
  }
  return (
    <TransactionTable
      columns={columns}
      data={testData}
      withPagination={false}
      withToolbar={false}
    />
  );
}

export default RecentTransactions;
