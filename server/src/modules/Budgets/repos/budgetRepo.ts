import { Budget } from '@Shared/types';
import type { CreateBudgetInput } from '../types/budget.types';

export interface IBudgetRepo {
  exists: (input: CreateBudgetInput, userId: string) => Promise<boolean>;
  createOne: (input: CreateBudgetInput, userId: string) => Promise<Budget>;
}
