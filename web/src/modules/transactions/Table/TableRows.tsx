import { useTableContext } from '@Context/react-table/reactTableContext';
import { TableRoot, TableHead, TableRow, Header, TableBody, TableCell } from './style';
import { UpArrow, DownArrow } from '@Common/Icons';

type Props = {
  stackedDisplayMobile?: boolean;
};

function TableRows({ stackedDisplayMobile = false }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTableContext();

  return (
    <TableRoot {...getTableProps()} $stackedDisplay={stackedDisplayMobile}>
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
  );
}

export default TableRows;
