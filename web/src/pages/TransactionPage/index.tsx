/* eslint-disable react/display-name */
import * as React from 'react';
import { TableContainer } from './style';
import Table from '@Components/Table';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { parseMoney } from '@Lib/parseMoney';
import { useGetTransactionsQuery } from '@Generated/graphql';
import { format } from 'date-fns';
import SelectTypeFilter from '@Components/Table/Toolbar/SelectTypeFilter';

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
      Filter: SelectTypeFilter,
      disableFilters: true,
    },
    {
      Header: 'Payee',
      accessor: 'payee',
      // filter: 'fuzzyText',
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
      Filter: SelectTypeFilter,
      filter: 'includes',
    },
    {
      Header: 'Category',
      accessor: 'category',
      Filter: SelectTypeFilter,
      disableFilters: true,
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
