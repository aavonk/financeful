import { Budget } from '@Shared/types';
import { CreateBudgetInput } from '../types/budget.types';

export interface IBudgetService {
  newBudget: (input: CreateBudgetInput, userId: string) => Promise<Budget>;
}
