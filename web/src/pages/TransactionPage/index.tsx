/* eslint-disable react/display-name */
import * as React from 'react';
import { TableContainer } from './style';
import { data } from './data';
import Table from '@Components/Table';
import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { parseMoney } from '@Lib/parseMoney';

function TransactionPage() {
  const testData = React.useMemo(() => data, []);
  const COLUMNS: Column<Transaction>[] = [
    {
      Header: 'Date',
      accessor: 'date',
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
  return (
    <>
      <TableContainer>
        <Table data={testData} columns={tableColumns} />
      </TableContainer>
    </>
  );
}

export default TransactionPage;
