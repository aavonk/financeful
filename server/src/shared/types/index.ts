import { IDataBase } from '../database/IDataBase';

export * from './inputTypes';
export * from './Transaction';
export * from './Account';
export * from './Category';
export * from './Context';
export * from './User';
export * from './DailyBalance';
export * from './Budget';
export * from './BudgetItem';
export * from './objectTypes';
export * from './inputTypes';

type Success = { success: boolean };
type PossibleError =
  | { success: true; message?: never }
  | { success: false; message: string };

type SuccessOrError = Success & PossibleError;

export { IDataBase, SuccessOrError };
