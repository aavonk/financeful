import type { BudgetItem } from '@Shared/types';
import type { CreateBudgetItemInput } from '../types/budgetItem.types';

export interface IBudgetItemRepo {
  createOne: (input: CreateBudgetItemInput) => Promise<BudgetItem>;
}
