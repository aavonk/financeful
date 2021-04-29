/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Column, Cell } from 'react-table';
import TransactionTable from '@Modules/transactions/Table';
import TableSkeleton from '@Modules/transactions/Table/TableSkeleton';
import TransactionTypeCell from '@Modules/transactions/Table/TransactionTypeCell';
import { Transaction } from '@Generated/graphql';
import { formatDate } from '@Lib/date-formatting';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import EmptyView from '@Components/EmptyViews/GeneralEmptyView';
import { ViewError } from '@Components/ErrorViews';
import Button from '@Common/Button';
import { FlexRow } from '@Globals/index';
import { useGetTransactionsRangeQuery } from '@Generated/graphql';

type Props = {
  startDate: Date;
  endDate: Date;
  accountId: string;
};

function RecentTransactions({ startDate, endDate, accountId }: Props) {
  const { data, loading, error } = useGetTransactionsRangeQuery({
    variables: { input: { startDate, endDate }, accountId },
  });

  const history = useHistory();
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
    return <TableSkeleton rows={5} columns={3} />;
  }

  if (error) {
    return <ViewError />;
  }

  if (!data || !data.getTransactionsRange.length) {
    return (
      <>
        <EmptyView
          heading="There aren't any transactions for the past 90 days"
          subheading="When you add some, you'll see them here"
          containerHeight="250px"
        />
        <FlexRow style={{ justifyContent: 'center', width: '100%' }}>
          <Button variant="primary" onClick={() => history.push('/transactions')}>
            Add Transactions
          </Button>
        </FlexRow>
      </>
    );
  }

  return (
    <TransactionTable
      columns={columns}
      data={data.getTransactionsRange}
      withPagination={false}
      withToolbar={false}
    />
  );
}

export default RecentTransactions;
