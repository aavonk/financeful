/* eslint-disable react/jsx-key */
import * as React from 'react';
import {
  useTable,
  useSortBy,
  TableOptions,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
import { UpArrow, DownArrow } from '@Common/Icons';
import Toolbar from './Toolbar/Toolbar';
import TablePagination from './Pagination';
import { TableRoot, TableHead, TableRow, Header, TableBody, TableCell } from './style';

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name?: string;
  withPagination?: boolean;
  withToolbar?: boolean;
  rowCount?: number;
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  withPagination = true,
  withToolbar = true,
  rowCount,
}: TableProperties<T>) {
  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: {
        pageSize: withPagination ? (rowCount ? rowCount : 50) : 10000,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
  );
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = instance;

  return (
    <>
      {withToolbar && <Toolbar instance={instance} />}
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableRoot>
      {withPagination && <TablePagination instance={instance} />}
    </>
  );
}

export default Table;
