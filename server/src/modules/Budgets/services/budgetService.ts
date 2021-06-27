import type {
  CreateBudgetInput,
  CreateBudgetResponse,
} from '../types/budget.types';
import type { Budget, MonthAndYear } from '@Shared/types';

export interface IBudgetService {
  newBudget: (
    input: CreateBudgetInput,
    userId: string,
  ) => Promise<CreateBudgetResponse>;
  getBudget: (date: MonthAndYear, userId: string) => Promise<Budget | null>;
}
