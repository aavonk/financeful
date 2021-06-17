import { CreateBudgetInput } from '../../types/budget.types';
import type { IBudgetService } from '../budgetService';
import type { IBudgetRepo } from '../../repos/budgetRepo';
import type { Budget } from '@Shared/types';

export class BudgetService implements IBudgetService {
  private budgetRepo: IBudgetRepo;

  constructor(budgetRepo: IBudgetRepo) {
    this.budgetRepo = budgetRepo;
  }

  async newBudget(input: CreateBudgetInput, userId: string): Promise<Budget> {
    //TODO: Check to see if the budget already exists for the current month.
    return await this.budgetRepo.createOne(input, userId);
  }
}
