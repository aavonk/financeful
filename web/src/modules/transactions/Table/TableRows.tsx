import type { Row, RowPropGetter } from 'react-table';
import { useTableContext } from '@Context/react-table/reactTableContext';
import { TableRoot, TableHead, TableRow, Header, TableBody, TableCell } from './style';
import { UpArrow, DownArrow } from '@Common/Icons';

type RowParam = Row<Record<string, unknown>>;

type Props = {
  stackedDisplayMobile?: boolean;
  hoverable?: boolean;
  getRowProps?: (row: RowParam) => Record<string, unknown>;
};

const defaultPropGetter = () => ({});

function TableRows({
  stackedDisplayMobile = false,
  hoverable = false,
  getRowProps = defaultPropGetter,
}: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTableContext();

  return (
    <TableRoot
      {...getTableProps()}
      $stackedDisplay={stackedDisplayMobile}
      $hoverable={hoverable}
    >
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Header
                {...column.getHeaderProps([
                  column.getSortByToggleProps(),
                  {
                    //@ts-ignore
                    className: column.className,
                    //@ts-ignore
                    style: column.style,
                  },
                ])}
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
            <TableRow {...row.getRowProps(getRowProps(row))}>
              {row.cells.map((cell) => {
                return (
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
  );
}

export default TableRows;
