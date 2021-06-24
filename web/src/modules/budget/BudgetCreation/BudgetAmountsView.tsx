import React from 'react';
import type { Cell, Column, Row } from 'react-table';
import TableRows from '../Table/TableRows';
import { theme } from '@Constants/theme';
import { Category } from '@Generated/graphql';
import { useCreateBudgetContext } from '@Context/create-budget/createBudgetContext';
import type { ModifiedCategory } from '@Context/create-budget/createBudgetContext';

import { NestedCell, GroupHeading } from '@Modules/budget/Table/style';
import EditableCell from '@Modules/budget/Table/EditableCell';

const getIncomeCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === true);
};

const getExpenseCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === false);
};

type DataType = {
  name: 'Income' | 'Expense';
  amount: string;
  currentMonth: number;
  expanded: boolean;
  subRows: ModifiedCategory[];
};

function BudgetAmountsView() {
  const {
    state: { selected },
  } = useCreateBudgetContext();
  const DATA: DataType[] = [
    {
      name: 'Income',
      amount: '$2,750.00',
      currentMonth: 0,
      expanded: true,
      subRows: [
        ...getIncomeCategories(selected).map((item) => ({ ...item, currentMonth: 0 })),
      ],
    },
    {
      name: 'Expense',
      amount: '$2,750.00',
      currentMonth: 0,
      expanded: true,
      subRows: [
        ...getExpenseCategories(selected).map((item) => ({ ...item, currentMonth: 0 })),
      ],
    },
  ];

  const [data, setData] = React.useState<DataType[]>(DATA);

  const updateRowOnEdit = (
    columnId: string,
    value: string,
    originalRow: Row<ModifiedCategory>['original'],
  ) => {
    setData((old) => {
      const [parentEl] = old.filter((parent, i) =>
        parent.subRows.some((j) => j.id === originalRow.id),
      );
      const parentIndex = old.indexOf(parentEl);

      const updates = old.map((parent, index) => {
        if (index === parentIndex) {
          const subRows = parent.subRows.map((child, i) => {
            // This is the subRow being changed -- apply edits
            if (child.id === originalRow.id) {
              return {
                ...child,
                [columnId]: parseInt(value),
              };
            }
            return child;
          });

          const totalAmount = parentEl.subRows.reduce(
            (total, obj) => obj.currentMonth + total,
            0,
          );

          return { ...parent, subRows, currentMonth: totalAmount };
        }
        return parent;
      });

      return updates;
    });
  };

  const columns = React.useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row, value }: Cell<any>) => {
          return 'subRows' in row.original ? (
            <GroupHeading>{value}</GroupHeading>
          ) : (
            <NestedCell>{value}</NestedCell>
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
        accessor: 'currentMonth',
        style: {
          textAlign: 'right',
        },
        Cell: ({ value, row, column }: Cell<any>) => {
          const hasKey = 'subRows' in row.original;
          return hasKey ? (
            <span>{value}</span>
          ) : (
            <EditableCell
              value={value}
              row={row}
              column={column}
              updateData={updateRowOnEdit}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <div>
      <TableRows
        columns={columns}
        data={data}
        expandSubRows
        getRowProps={(row) => ({
          style: {
            background: 'subRows' in row.original ? theme.colors.darkTwo : 'transparent',
          },
        })}
      />
    </div>
  );
}

export default BudgetAmountsView;
