import React from 'react';
import TableRows from './Table/TableRows';
import TableSkeleton from './Table/TableSkeleton';
import NoBudgetView from './NoBudgetView';

import Paper from '@Common/Paper';
import Pill from '@Common/Pill';

import { useGetBudgetQuery } from '@Generated/graphql';
import { getCurrentMonthName, getCurrentYear } from '@Lib/date-formatting';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import { ViewError } from '@Components/ErrorViews';
import type { Column, Cell } from 'react-table';
import type { PillVariants } from '@Common/Pill';
import type { BudgetItem } from '@Generated/graphql';

type ProgressMessage = {
  variant: PillVariants;
  message: string;
};

const getProgressMessage = (
  budgetAmount: number,
  actualAmount: number,
): ProgressMessage => {
  const percentage = (actualAmount / budgetAmount) * 100;

  if (percentage >= 80 && percentage < 100) {
    return {
      variant: 'warning',
      message: 'Approaching',
    };
  }

  if (actualAmount > budgetAmount) {
    return {
      variant: 'danger',
      message: 'Over budget',
    };
  }

  return {
    variant: 'primary',
    message: 'On track',
  };
};

function BudgetController() {
  const { data, loading, error } = useGetBudgetQuery({
    variables: { date: { monthName: getCurrentMonthName(), year: getCurrentYear() } },
  });
  const columns = React.useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Category',
        accessor: 'category.name',
      },
      {
        Header: 'Budget',
        accessor: 'budgetAmount',
        style: {
          textAlign: 'right',
        },
        Cell: ({ value }: Cell<BudgetItem>) => (
          <span>{formatMoneyFromCentsToDollars(value)}</span>
        ),
      },
      {
        Header: 'Actual',
        accessor: 'amount',
        style: {
          textAlign: 'right',
        },
        Cell: ({ value }: Cell<BudgetItem>) => (
          <span>{formatMoneyFromCentsToDollars(value)}</span>
        ),
      },
      {
        Header: 'Progress',
        Cell: ({ row: { original } }: Cell<BudgetItem>) => {
          const { message, variant } = getProgressMessage(
            original.budgetAmount!,
            original.amount,
          );
          return (
            <span>
              <Pill text={message} variant={variant} />
            </span>
          );
        },
      },
      {
        Header: 'Remaining',
        Cell: ({ row }: Cell<BudgetItem>) => {
          const { original } = row;
          const value = original.budgetAmount - original.amount;
          return <span>{formatMoneyFromCentsToDollars(value)}</span>;
        },
        style: {
          textAlign: 'right',
        },
      },
    ],
    [],
  );

  if (loading) {
    return <TableSkeleton columns={5} rows={15} />;
  }

  if (error) {
    return (
      <Paper>
        <ViewError containerHeight="400px" />
      </Paper>
    );
  }

  return (
    <>
      {data?.getBudget ? (
        <TableRows columns={columns} data={data.getBudget.items!} />
      ) : (
        <NoBudgetView />
      )}
    </>
  );
}

export default BudgetController;
