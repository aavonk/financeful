import {
  CreateBudgetInput,
  CreateBudgetResponse,
} from '../../types/budget.types';
import type { IBudgetService } from '../budgetService';
import type { IBudgetRepo } from '../../repos/budgetRepo';
import type { Budget, MonthAndYear } from '@Shared/types';

export class BudgetService implements IBudgetService {
  private budgetRepo: IBudgetRepo;

  constructor(budgetRepo: IBudgetRepo) {
    this.budgetRepo = budgetRepo;
  }

  async newBudget(
    input: CreateBudgetInput,
    userId: string,
  ): Promise<CreateBudgetResponse> {
    const exists = await this.budgetRepo.exists(input, userId);

    if (exists) {
      return {
        error: {
          message: `A budget already exists for ${input.month} ${input.year}`,
        },
      };
    }

    const data = await this.budgetRepo.createOne(input, userId);
    return { data };
  }

  async getBudget(date: MonthAndYear, userId: string): Promise<Budget | null> {
    return await this.budgetRepo.getBudget(date, userId);
  }
}
