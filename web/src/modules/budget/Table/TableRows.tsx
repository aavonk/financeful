import React from 'react';
import { useTable, useExpanded } from 'react-table';
import type { TableOptions, Row } from 'react-table';

type RowParam = Row<Record<string, unknown>>;

interface TableProps<T extends Record<string, unknown>> extends TableOptions<T> {
  debugMode?: boolean;
  getRowProps?: (row: RowParam) => Record<string, unknown>;
}
const defaultPropGetter = () => ({});

function TableRows<T extends Record<string, unknown>>({
  data,
  columns: userColumns,
  debugMode = false,
  getRowProps = defaultPropGetter,
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
    <>
      {debugMode && (
        <pre>
          <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
        </pre>
      )}
      <table {...getTableProps()}>
        <thead style={{ backgroundColor: 'blue' }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps(getRowProps(row as RowParam))}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      // If a row has subrows  then it's considered a
                      // group -- apply these styles
                      // style={{
                      //   background: row.subRows.length > 0 ? 'blue' : 'transparent',
                      // }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableRows;
