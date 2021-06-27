import { Budget, MonthAndYear } from '@Shared/types';
import type { CreateBudgetInput } from '../types/budget.types';

export interface IBudgetRepo {
  exists: (input: CreateBudgetInput, userId: string) => Promise<boolean>;
  createOne: (input: CreateBudgetInput, userId: string) => Promise<Budget>;
  getBudget: (date: MonthAndYear, userId: string) => Promise<Budget | null>;
}
