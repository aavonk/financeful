import type { IBudgetItemRepo } from '../budgetItemRepo';
import type { BudgetItem, IDataBase } from '@Shared/types';
import type { ICategoryRepo } from '@Modules/Categories/repos/categoryRepo';
import type { CreateBudgetItemInput } from '../../types/budgetItem.types';

export class BudgetItemRepo implements IBudgetItemRepo {
  private readonly client: IDataBase;
  private readonly categoryRepo: ICategoryRepo;

  constructor(database: IDataBase, categoryRepo: ICategoryRepo) {
    this.client = database;
    this.categoryRepo = categoryRepo;
  }

  async createOne(input: CreateBudgetItemInput): Promise<BudgetItem> {
    const { budgetAmount, budgetId, categoryId } = input;

    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new Error('No Category found by that ID');
    }

    const item = await this.client.budgetItem.create({
      data: {
        budgetId,
        budgetAmount,
        amount: 0, // the current amount will start at 0
        categoryId: category.id,
        isExpense: !category.isIncome,
        isIncome: category.isIncome,
        isTransfer: false, // Defaulting to false because we don't have a method for supporting transfer budget items yet.
      },
    });

    return item;
  }
}
