import React from 'react';
import Skeleton from '@Common/Skeleton';

import { TableRoot, TableHead, TableCell, Header, TableRow, TableBody } from './style';

type Props = {
  rows: number;
  columns: number;
};
function TableSkeleton({ rows, columns }: Props) {
  const rowsArray = new Array(rows).fill(undefined).map((val, idx) => idx);
  const colsArray = new Array(columns).fill(undefined).map((val, idx) => idx);

  return (
    <TableRoot aria-disabled="true" aria-label="Loading transactions">
      <TableHead>
        <TableRow>
          {colsArray.map((col, index) => (
            <Header key={index}>
              <Skeleton height="16px" width={index == 2 ? '200px' : '100px'} />
            </Header>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rowsArray.map((row, index) => (
          <TableRow key={index}>
            {colsArray.map((col, index) => (
              <TableCell key={index}>
                <Skeleton height="16px" width={index == 2 ? '200px' : '100px'} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}

export default TableSkeleton;
