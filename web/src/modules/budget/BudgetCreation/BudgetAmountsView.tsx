import React from 'react';
import type { Cell, Column } from 'react-table';
import TableRows from '../Table/TableRows';
import { theme } from '@Constants/theme';

const testData = [
  {
    name: 'Income',
    amount: '$2,750.00',
    isIncome: true,
    expanded: true,
    subRows: [
      {
        id: 'ckq0yhgxn0120thqsuxq9aqdg',
        name: 'Investment Income',
        description: null,
        excludeFromBudget: false,
        isHidden: false,
        isIncome: false,
      },
      {
        id: 'ckq0yhgx40113thqsny12ftjs',
        name: 'Paycheck',
        description: null,
        excludeFromBudget: false,
        isHidden: false,
        isIncome: false,
      },
    ],
  },
  {
    name: 'Expenses',
    amount: '$3,220.00',
    isIncome: false,
    expanded: true,
    subRows: [
      {
        id: 'ckq0yhgnv0062thqsf9uzsal0',
        name: 'Drinks & Snacks',
        description: null,
        excludeFromBudget: false,
        isHidden: false,
        isIncome: false,
      },
      {
        id: 'ckq0yhgu50094thqshudllj2n',
        name: 'Electronics',
        description: null,
        excludeFromBudget: false,
        isHidden: false,
        isIncome: false,
      },
      {
        id: 'ckq0yhgrz0081thqssmh904pv',
        name: 'Entertainment',
        description: null,
        excludeFromBudget: false,
        isHidden: false,
        isIncome: false,
      },
      {
        id: 'ckq0yhgn50056thqsutj7cdop',
        name: 'Groceries',
        description: null,
        excludeFromBudget: false,
        isHidden: false,
        isIncome: false,
      },
    ],
  },
];

function BudgetAmountsView() {
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
      },
    ],
    [],
  );
  return (
    <div>
      <TableRows
        columns={columns}
        data={testData}
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
