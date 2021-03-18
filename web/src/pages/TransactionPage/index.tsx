/* eslint-disable react/display-name */
import * as React from 'react';
import { TableContainer } from './style';
import Table from '@Components/Table';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { parseMoney } from '@Lib/parseMoney';
import { useGetTransactionsQuery } from '@Generated/graphql';
import { format } from 'date-fns';

function TransactionPage() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const { data, error } = useGetTransactionsQuery();

  const COLUMNS: Column<Record<string, unknown>>[] = [
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }: Cell<Transaction>) => {
        return <span>{format(new Date(value), 'MMM do y')}</span>;
      },
    },
    {
      Header: 'Payee',
      accessor: 'payee',
      // filter: 'fuzzyText',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: () => <span className="align-right">Amount</span>,
      accessor: 'amount',
      Cell: ({ value }: Cell<Transaction>) => {
        return <div className="number">{parseMoney(value)}</div>;
      },
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
  ];
  const tableColumns = React.useMemo(() => COLUMNS, []);

  React.useEffect(() => {
    if (data?.getTransactions) {
      setTransactions(data.getTransactions);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }
  return (
    <>
      <TableContainer>
        <Table data={transactions} columns={tableColumns} />
      </TableContainer>
    </>
  );
}

export default TransactionPage;
