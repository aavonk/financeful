import React from 'react';
import TableRows from './Table/TableRows';
import type { Column } from 'react-table';

function BudgetController() {
  const columns = React.useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Category',
      },
    ],
    [],
  );
  return <div>Budget</div>;
}

export default BudgetController;
