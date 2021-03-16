import * as React from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import TransactionTable from './components/TransactionTable';
import { TableContainer } from './style';
import { data } from './components/TransactionTable/data';

function TransactionPage() {
  return (
    <>
      <Toolbar />
      <TableContainer>
        <TransactionTable data={data} />
      </TableContainer>
    </>
  );
}

export default TransactionPage;
