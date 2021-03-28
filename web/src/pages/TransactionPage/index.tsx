/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { TableContainer } from './style';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { parseMoney } from '@Lib/parseMoney';
import { useGetTransactionsQuery } from '@Generated/graphql';
import { format } from 'date-fns';
import Table from '@Components/Table';
import SelectTypeFilter from '@Components/Table/Toolbar/SelectTypeFilter';
import TableSkeleton from '@Components/Table/TableSkeleton';
import TransactionTypeCell from './components/TransactionTypeCell';
import { TableError } from '@Components/ErrorViews';
import { ErrorBoundary } from 'react-error-boundary';
import NoTransactions from './components/NoTransactions';

function TransactionPage() {
  const { data, error, loading } = useGetTransactionsQuery();

  const COLUMNS: Column<Record<string, unknown>>[] = [
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
        return <div className="number">{parseMoney(value)}</div>;
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
  ];
  const tableColumns = useMemo(() => COLUMNS, []);

  if (loading) {
    return <TableSkeleton columns={6} rows={8} />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  if (!data?.getTransactions?.length) {
    return <NoTransactions />;
  }

  return (
    <>
      <TableContainer>
        <ErrorBoundary FallbackComponent={TableError}>
          <Table data={data.getTransactions} columns={tableColumns} />
        </ErrorBoundary>
      </TableContainer>
    </>
  );
}

export default TransactionPage;
