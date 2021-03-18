/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
// import {
//   UseSortByColumnOptions,
//   UseSortByColumnProps,
//   UseSortByInstanceProps,
//   UseSortByOptions,
//   UseSortByState,
// } from 'react-table';

// declare module 'react-table' {
//   export interface TableOptions<D extends object> extends UseSortByOptions<D> {}

//   export interface TableInstance<D extends object = {}>
//     extends UseSortByInstanceProps<D> {}

//   export interface TableState<D extends object = {}>
//     extends UseSortByState<D> {}

//   export interface Column<D extends object = {}>
//     extends UseSortByColumnOptions<D> {}

//   export interface ColumnInstance<D extends Record<string, unknown> = {}>
//     extends UseSortByColumnProps<D> {}
// }

import {
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

declare module 'react-table' {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<
    D extends Record<string, unknown>
  > extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      Record<string, any> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      UseRowSelectHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseGroupByState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseSortByColumnProps<D> {}

  export interface Cell<
    D extends Record<string, unknown> = Record<string, unknown>,
    V = any
  > extends UseGroupByCellProps<D>,
      UseRowStateCellProps<D> {}

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {}
}

//#region useFilters
export function useFilters<D extends object = {}>(hooks: Hooks<D>): void;

export namespace useFilters {
  const pluginName = 'useFilters';
}

export type UseFiltersOptions<D extends object> = Partial<{
  manualFilters: boolean;
  disableFilters: boolean;
  defaultCanFilter: boolean;
  filterTypes: FilterTypes<D>;
  autoResetFilters?: boolean;
}>;

export interface UseFiltersState<D extends object> {
  filters: Filters<D>;
}

export type UseFiltersColumnOptions<D extends object> = Partial<{
  Filter: Renderer<FilterProps<D>>;
  disableFilters: boolean;
  defaultCanFilter: boolean;
  filter: FilterType<D> | DefaultFilterTypes | string;
}>;

export interface UseFiltersInstanceProps<D extends object> {
  preFilteredRows: Array<Row<D>>;
  preFilteredFlatRows: Array<Row<D>>;
  preFilteredRowsById: Record<string, Row<D>>;
  filteredRows: Array<Row<D>>;
  filteredFlatRows: Array<Row<D>>;
  filteredRowsById: Record<string, Row<D>>;
  rows: Array<Row<D>>;
  flatRows: Array<Row<D>>;
  rowsById: Record<string, Row<D>>;
  setFilter: (
    columnId: IdType<D>,
    updater: ((filterValue: FilterValue) => FilterValue) | FilterValue,
  ) => void;
  setAllFilters: (
    updater: Filters<D> | ((filters: Filters<D>) => Filters<D>),
  ) => void;
}

export interface UseFiltersColumnProps<D extends object> {
  canFilter: boolean;
  setFilter: (
    updater: ((filterValue: FilterValue) => FilterValue) | FilterValue,
  ) => void;
  filterValue: FilterValue;
  preFilteredRows: Array<Row<D>>;
  filteredRows: Array<Row<D>>;
}

export type FilterProps<D extends object> = HeaderProps<D>;
export type FilterValue = any;
export type Filters<D extends object> = Array<{
  id: IdType<D>;
  value: FilterValue;
}>;
export type FilterTypes<D extends object> = Record<string, FilterValue>;

export type DefaultFilterTypes =
  | 'text'
  | 'exactText'
  | 'exactTextCase'
  | 'includes'
  | 'includesAll'
  | 'exact'
  | 'equals'
  | 'between';

export interface FilterType<D extends object> {
  (
    rows: Array<Row<D>>,
    columnIds: Array<IdType<D>>,
    filterValue: FilterValue,
  ): Array<Row<D>>;

  autoRemove?: (filterValue: FilterValue) => boolean;
}
