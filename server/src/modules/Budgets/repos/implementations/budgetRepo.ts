import type { IDataBase, Budget } from '@Shared/types';
import type { IBudgetRepo } from '../budgetRepo';
import type { CreateBudgetInput } from '../../types/budget.types';

export class BudgetRepo implements IBudgetRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  async exists(input: CreateBudgetInput, userId: string): Promise<boolean> {
    const { month, year } = input;

    const existingBudget = await this.client.budget.findFirst({
      where: {
        userId,
        AND: [
          {
            month: {
              equals: month,
            },
          },
          {
            year: {
              equals: year,
            },
          },
        ],
      },
    });

    if (!existingBudget) {
      return false;
    }

    return true;
  }

  async createOne(input: CreateBudgetInput, userId: string): Promise<Budget> {
    return await this.client.budget.create({
      data: {
        month: input.month,
        year: input.year,
        userId,
      },
    });
  }
}
