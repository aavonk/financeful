import React from 'react';
import type { Column, Cell } from 'react-table';
import ExpandableTable from '@Modules/budget/Table/TableRows';
import { theme } from '@Constants/theme';
import Task from '@Components/Tasks';
import { InfoIcon } from '@Common/Icons';
import MessageAlert from '@Common/Alerts/AlertMessage';

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
  // const columns = React.useMemo<Column<Record<string, unknown>>[]>(
  //   () => [
  //     {
  //       Header: 'Name',
  //       accessor: 'name',
  //       Cell: ({ row, value }: Cell<any>) => {
  //         return row.canExpand ? (
  //           // Styles applied to the top row (not subRows) "Income/Expense"
  //           <span style={{ fontWeight: 600, paddingLeft: 0 }}>{value}</span>
  //         ) : (
  //           // Categories that are not the group "Income/Expense"
  //           <span style={{ paddingLeft: '40px' }}>{value}</span>
  //         );
  //       },
  //     },
  //     {
  //       Header: 'Description',
  //       accessor: 'description',
  //     },
  //     {
  //       Header: 'Is Income',
  //       accessor: 'isIncome',
  //     },
  //   ],
  //   [],
  // );
  return (
    <>
      <p>Hi</p>
      <div style={{ marginTop: '20px', maxWidth: '800px' }}></div>
      <div>
        TODO:
        <ul>
          <li>Setup Cypress with Docker</li>
          <li>Design and implement Budget Page</li>
          <li>
            Add Income/Expense Badges & Hidden badges to Categories in Setting page to
            show what they are without having to open up the edit modal
          </li>
          <li>
            IMPORTANT: In budget create flow -- fetch categories where excludeFromBudget
            === false
          </li>
          <li>
            Create a new Theme Object using colors from
            <a
              href="https://dribbble.com/shots/15025442-Dark-UI-Elements"
              rel="no_referrer no opener"
            >
              This link
            </a>
          </li>
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
          <Task
            heading="Missing categories?"
            subheading="If you think some categories should be in the income group, 
            you might need to mark them as Income"
            icon={<InfoIcon />}
            variant="info"
          />
          <MessageAlert
            variant="info"
            customMessage
            messageComponent={
              <span>
                Missing some categories? You might need to <a>mark them as income</a>
              </span>
            }
          />
          {/* <ExpandableTable
            columns={columns}
            data={testData}
            expandSubRows
            getRowProps={(row) => ({
              style: {
                background: row.canExpand ? theme.colors.background : 'transparent',
              },
            })} */}
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
