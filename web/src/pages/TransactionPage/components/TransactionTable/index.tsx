/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import * as React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Transaction } from '@Generated/graphql';
import { Column, Cell } from 'react-table';
import { parseMoney } from '../../../../lib/parseMoney';
// import { Transaction } from '@Generated/graphql';
// import { COLUMNS } from './columns';
import Paper from '@Common/Paper';
import {
  Table,
  TableHead,
  TableRow,
  Header,
  TableBody,
  TableCell,
} from './style';

type Props = {
  data: Transaction[];
};

function TransactionTable({ data }: Props) {
  const COLUMNS: Column<Transaction>[] = [
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
      Header: () => <div className="align-right">Amount</div>,
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

  const columns = React.useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Transaction>({ columns, data }, useSortBy);
  return (
    <Paper>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Header
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {' '}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}{' '}
                  </span>
                </Header>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() => console.log(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TransactionTable;
