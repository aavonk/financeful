/* eslint-disable react/jsx-key */
import * as React from 'react';
import {
  useTable,
  useSortBy,
  TableInstance,
  TableOptions,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { Transaction } from '@Generated/graphql';
import { Column } from 'react-table';
import Paper from '@Common/Paper';
import { UpArrow, DownArrow } from '@Common/Icons';
import Toolbar from './Toolbar/Toolbar';

import {
  TableRoot,
  TableHead,
  TableRow,
  Header,
  TableBody,
  TableCell,
} from './style';

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name?: string;
  // data: any[];
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
}: TableProperties<T>) {
  const instance = useTable<T>(
    { columns, data },
    useGlobalFilter,
    useFilters,
    useSortBy,
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = instance;

  return (
    <>
      <Toolbar instance={instance} />
      <Paper>
        <TableRoot {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Header
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.getHeaderProps().key === 'header_amount'
                        ? 'amount-header'
                        : undefined
                    }
                  >
                    {column.render('Header')}
                    <span
                      aria-hidden="true"
                      className={
                        column.getHeaderProps().key === 'header_amount'
                          ? 'amount-header'
                          : undefined
                      }
                    >
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <DownArrow />
                        ) : (
                          <UpArrow />
                        )
                      ) : (
                        ''
                      )}
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
        </TableRoot>
      </Paper>
    </>
  );
}

export default Table;
