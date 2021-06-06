import React, { createContext, useContext } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
import type { TableOptions, TableInstance } from 'react-table';

interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {
  withPagination?: boolean;
  withToolbar?: boolean;
  rowCount?: number;
  children: React.ReactNode;
}

type ContextType<T extends Record<string, unknown>> = TableInstance<T>;

function createTableContext<T extends Record<string, unknown>>() {
  return createContext<ContextType<T> | undefined>(undefined);
}

const TableContext = createTableContext();

export function ReactTableProvider<T extends Record<string, unknown>>({
  withPagination,
  rowCount,
  data,
  columns,
  children,
}: TableProperties<T>) {
  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: {
        pageSize: withPagination ? (rowCount ? rowCount : 50) : 10000,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
  );

  return (
    //@ts-ignore
    <TableContext.Provider value={{ ...instance }}>{children}</TableContext.Provider>
  );
}

export function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within a ReactTableProvider');
  }

  return context;
}
