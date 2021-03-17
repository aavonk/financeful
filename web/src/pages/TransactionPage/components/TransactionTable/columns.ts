import { Column, Cell } from 'react-table';
import { Transaction } from '@Generated/graphql';

export const COLUMNS: Column<Transaction>[] = [
  {
    Header: 'Date',
    accessor: 'date',
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
    Header: 'Amount',
    accessor: 'amount',
    Cell: ({ value }: Cell<Transaction>) => {
      return `$${value}`;
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
