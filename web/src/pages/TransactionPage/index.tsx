import React, { useMemo } from 'react';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { useGetTransactionsRangeQuery } from '@Generated/graphql';
import { format } from 'date-fns';
import SelectTypeFilter from '@Modules/transactions/Table/Toolbar/SelectTypeFilter';
import { TableError } from '@Components/ErrorViews';
import { ErrorBoundary } from 'react-error-boundary';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';
import { TableContainer, ContentContainer, Left, Right } from './style';
import { ReactTableProvider } from '@Context/react-table/reactTableContext';
import {
  TableRows,
  TableActions,
  TableSkeleton,
  TransactionTypeCell,
  NoTransactionsView,
  TablePagination,
} from '@Modules/transactions/Table';

function TransactionPage() {
  const { range } = useDateRangeContext();
  const { data, error, loading } = useGetTransactionsRangeQuery({
    variables: { input: { startDate: range.startDate, endDate: range.endDate } },
  });

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
        Header: () => <span className="align-right">Amount</span>,
        accessor: 'amount',
        Cell: ({ value }: Cell<Transaction>) => {
          return <div className="number">{formatMoneyFromCentsToDollars(value)}</div>;
        },
        Filter: SelectTypeFilter,
        disableFilters: true,
      },
      {
        Header: 'Category',
        accessor: 'category.name',
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
    return <NoTransactionsView />;
  }

  return (
    <ContentContainer>
      <Left>
        <TableContainer>
          <ErrorBoundary FallbackComponent={TableError}>
            <ReactTableProvider
              withPagination={true}
              columns={columns}
              data={data.getTransactionsRange}
            >
              <TableRows />
              <TablePagination />
            </ReactTableProvider>
          </ErrorBoundary>
        </TableContainer>
      </Left>
      <Right>Right side of transactions</Right>
    </ContentContainer>
  );
}

export default TransactionPage;
