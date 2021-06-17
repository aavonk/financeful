import { CreateBudgetInput, CreateBudgetResponse } from '../types/budget.types';

export interface IBudgetService {
  newBudget: (
    input: CreateBudgetInput,
    userId: string,
  ) => Promise<CreateBudgetResponse>;
}
