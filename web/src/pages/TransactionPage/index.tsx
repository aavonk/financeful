/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { TableContainer } from './style';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import {
  useGetTransactionsQuery,
  useGetTransactionsRangeQuery,
} from '@Generated/graphql';
import { format } from 'date-fns';
import Table from '@Modules/transactions/Table';
import SelectTypeFilter from '@Modules/transactions/Table/Toolbar/SelectTypeFilter';
import TableSkeleton from '@Modules/transactions/Table/TableSkeleton';
import TableActions from '@Modules/transactions/Table/Actions';
import TransactionTypeCell from '@Modules/transactions/Table/TransactionTypeCell';
import { TableError } from '@Components/ErrorViews';
import { ErrorBoundary } from 'react-error-boundary';
import NoTransactions from '@Modules/transactions/Table/NoTransactions';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';
function TransactionPage() {
  const { range } = useDateRangeContext();
  const { data, error, loading } = useGetTransactionsRangeQuery({
    variables: { input: { startDate: range.startDate, endDate: range.endDate } },
  });
  // const { data, error, loading } = useGetTransactionsQuery();
  const columns = useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }: Cell<Transaction>) => {
          return <span>{format(new Date(value), 'MMM do y')}</span>;
        },
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Account',
        accessor: 'account.accountName',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Payee',
        accessor: 'payee',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: () => <span className="align-right">Amount</span>,
        accessor: 'amount',
        Cell: ({ value }: Cell<Transaction>) => {
          return <div className="number">{formatMoneyFromCentsToDollars(value)}</div>;
        },
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: Cell<Transaction>) => {
          return <TransactionTypeCell type={value} />;
        },
        Filter: SelectTypeFilter,
        filter: 'includes',
      },
      {
        Header: 'Category',
        accessor: 'category.name',
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Actions',
        Cell: ({ row }: Cell<Transaction>) => <TableActions transaction={row.original} />,
      },
    ],
    [],
  );

  if (loading) {
    return <TableSkeleton columns={6} rows={20} />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  if (!data?.getTransactionsRange?.length) {
    return <NoTransactions />;
  }

  return (
    <>
      <TableContainer>
        <ErrorBoundary FallbackComponent={TableError}>
          <Table data={data.getTransactionsRange} columns={columns} />
        </ErrorBoundary>
      </TableContainer>
    </>
  );
}

export default TransactionPage;
