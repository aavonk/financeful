import React from 'react';
import type { Column, Cell } from 'react-table';
import ExpandableTable from '@Modules/budget/Table/TableRows';

const testData = [
  {
    name: 'Income',
    description: 'Income Categories',
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
    description: 'Expense Categories',
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

function DashboardPage() {
  const columns = React.useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        id: 'expander',
        //@ts-ignore
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👆'}
          </span>
        ),

        Cell: ({ row }: Cell<any>) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? '👇' : '👉'}
            </span>
          ) : null,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row, value }: Cell<any>) => {
          return row.canExpand ? (
            // Styles applied to the top row (not subRows) "Income/Expense"
            <span style={{ color: 'red', paddingLeft: 0 }}>{value}</span>
          ) : (
            // Categories that are not the group "Income/Expense"
            <span style={{ paddingLeft: '40px' }}>{value}</span>
          );
        },
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Is Income',
        accessor: 'isIncome',
      },
    ],
    [],
  );
  return (
    <>
      <p>Hi</p>
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>Setup Cypress with Docker</li>
          <li>Design and implement Budget Page</li>
        </ul>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            padding: '10px',
          }}
        >
          <div>How to apply a style to a specific row? e.g. background-color</div>
          <ExpandableTable
            columns={columns}
            data={testData}
            debugMode
            expandSubRows
            getRowProps={() => ({
              style: { background: 'pink' },
            })}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
