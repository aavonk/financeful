import React from 'react';
import type { Cell, Column } from 'react-table';
import TableRows from '../Table/TableRows';
import { theme } from '@Constants/theme';
import { Category } from '@Generated/graphql';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import EditableCell from '@Modules/budget/Table/EditableCell';

const getIncomeCategories = (cats: Category[]): Category[] => {
  return cats.filter((item) => item.isIncome === true);
};

const getExpenseCategories = (cats: Category[]): Category[] => {
  return cats.filter((item) => item.isIncome === false);
};

function BudgetAmountsView() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const DATA = [
    {
      name: 'Income',
      amount: '$2,750.00',
      isIncome: true,
      expanded: true,
      subRows: [...getIncomeCategories(selected)],
    },
    {
      name: 'Expense',
      amount: '$2,750.00',
      isIncome: true,
      expanded: true,
      subRows: [...getExpenseCategories(selected)],
    },
  ];

  console.log(DATA);
  const columns = React.useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row, value }: Cell<any>) => {
          return row.canExpand ? (
            // Styles applied to the top row (not subRows) "Income/Expense"
            <span style={{ fontWeight: 600, paddingLeft: 0 }}>{value}</span>
          ) : (
            // Categories that are not the group "Income/Expense"
            <span style={{ paddingLeft: '40px' }}>{value}</span>
          );
        },
      },
      {
        Header: 'Last month',
        accessor: 'amount',
        style: {
          textAlign: 'right',
        },
      },
      {
        Header: 'This month',
        accessor: 'isIncome',
        style: {
          textAlign: 'right',
        },
        Cell: ({ value, row, column }: Cell<any>) => {
          return row.canExpand ? (
            <span>{value}</span>
          ) : (
            <EditableCell value={value} row={row} column={column} />
          );
        },
      },
    ],
    [],
  );

  //TODO: Reproduce BUG::: Select 2 Expense categories (or more) and NO income categories.
  // The issue is that row.canExpand doesn't care whether or not I consider the row a "group".
  // It just cares if there are subrows
  return (
    <div>
      <TableRows
        columns={columns}
        data={DATA}
        expandSubRows
        getRowProps={(row) => ({
          style: {
            background: row.canExpand ? theme.colors.background : 'transparent',
          },
        })}
      />
    </div>
  );
}

export default BudgetAmountsView;
