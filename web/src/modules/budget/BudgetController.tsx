import React from 'react';
import TableRows from './Table/TableRows';
import type { Column, Cell } from 'react-table';
import { useGetBudgetQuery } from '@Generated/graphql';
import type { Budget, BudgetItem } from '@Generated/graphql';
import { getCurrentMonthName, getCurrentYear } from '@Lib/date-formatting';

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
      },
      {
        Header: 'Actual',
        accessor: 'amount',
        style: {
          textAlign: 'right',
        },
      },
      {
        Header: 'Progress',
        accessor: 'id',
      },
      {
        Header: 'Remaining',
        Cell: ({ row }: Cell<BudgetItem>) => {
          const { original } = row;
          const value = original.budgetAmount - original.amount;
          return <span>{value}</span>;
        },
      },
    ],
    [],
  );

  if (loading) {
    return <div>LOADING.....</div>;
  }

  if (error) {
    return <div>Error.....</div>;
  }

  return (
    <>
      {data?.getBudget ? (
        <TableRows columns={columns} data={data.getBudget.items!} />
      ) : null}
    </>
  );
}

export default BudgetController;
