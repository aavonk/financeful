import React from 'react';
import { useTable, useExpanded } from 'react-table';
import type { TableOptions, Row, HeaderGroup, HeaderGroupPropGetter } from 'react-table';
import {
  TableBody,
  TableHead,
  TableRoot,
  TableCell,
  TableRow,
  Header,
  BoldCell,
} from './style';
import Paper from '@Common/Paper';

/* This table differs from the Table Component in the modules/transaction/table
 * directory in a few ways:
 * 1. It has a different color/style scheme
 * 2. It has expandable rows which can be triggered by a column or default to expanded
 * 3. It supports editable cell(s)
 * 4. It does *not* support pagination
 * 5. It uses data passed in as a prop rather than through Context
 * 6. The way it responds to small screens is different
 */

type RowParam = Row<Record<string, unknown>>;
type HeaderParam = HeaderGroup;

interface RowPropsReturned extends Record<string, unknown> {
  style?: React.CSSProperties;
}

interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  debugMode?: boolean;
  getRowProps?: (row: RowParam) => RowPropsReturned;
  getColumnProps?: (col: HeaderGroup) => Record<string, unknown>;
}

const defaultPropGetter = () => ({});

function TableRows<T extends Record<string, unknown>>({
  data,
  columns: userColumns,
  debugMode = false,
  getRowProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable<T>({ columns: userColumns, data }, useExpanded);

  return (
    <Paper style={{ paddingBottom: '1rem' }}>
      {debugMode && (
        <pre>
          <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
        </pre>
      )}
      <TableRoot {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Header
                  {...column.getHeaderProps([
                    {
                      //@ts-ignore
                      className: column.className,
                      //@ts-ignore
                      style: column.style,
                    },
                  ])}
                >
                  {column.render('Header')}
                </Header>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps(getRowProps(row as RowParam))}>
                {row.cells.map((cell) => {
                  return 'subRow' in cell.row.original ? (
                    <BoldCell
                      {...cell.getCellProps([
                        {
                          //@ts-ignore
                          className: cell.column.className,
                          //@ts-ignore
                          style: cell.column.style,
                        },
                      ])}
                    >
                      {cell.render('Cell')}
                    </BoldCell>
                  ) : (
                    <TableCell
                      {...cell.getCellProps([
                        {
                          //@ts-ignore
                          className: cell.column.className,
                          //@ts-ignore
                          style: cell.column.style,
                        },
                      ])}
                    >
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
  );
}

export default TableRows;
