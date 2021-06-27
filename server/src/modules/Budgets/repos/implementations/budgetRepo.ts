import type { IDataBase, Budget, MonthAndYear } from '@Shared/types';
import type { IBudgetRepo } from '../budgetRepo';
import type { CreateBudgetInput } from '../../types/budget.types';

export class BudgetRepo implements IBudgetRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  private getCategoryOptions(): any {
    return {
      include: {
        items: {
          include: {
            category: true,
          },
        },
      },
    };
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
    const { items } = input;
    const itemsCreateInput = items.map((item) => ({
      ...item,
      amount: 0,
      isTransfer: false,
    }));
    return await this.client.budget.create({
      data: {
        month: input.month,
        year: input.year,
        userId,
        items: {
          createMany: {
            data: itemsCreateInput,
          },
        },
      },
      ...this.getCategoryOptions(),
    });
  }

  async getBudget(date: MonthAndYear, userId: string): Promise<Budget | null> {
    const { monthName, year } = date;

    return await this.client.budget.findFirst({
      where: {
        userId,
        AND: [
          {
            month: {
              equals: monthName,
            },
          },
          {
            year: {
              equals: year,
            },
          },
        ],
      },
      ...this.getCategoryOptions(),
    });
  }
}
