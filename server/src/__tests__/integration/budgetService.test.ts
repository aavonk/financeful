import { BudgetService } from '@Modules/Budgets/services/implementations/budgetService';
import { BudgetRepo } from '@Modules/Budgets/repos/implementations/budgetRepo';
import type { CreateBudgetItemInput } from '@Modules/Budgets/types/budget.types';
import { PrismaClient } from '@prisma/client';
import { resetDatabase, createCategories, createUser } from '../helpers';
import { categories as MockCategories } from '../__mocks__/fixtures/categories';
// import type { CreateBudgetInput } from '@Modules/Budgets/types/budget.types'

let prisma: PrismaClient;
let budgetRepo: BudgetRepo;
let budgetService: BudgetService;

beforeAll(() => {
  prisma = new PrismaClient();
  budgetRepo = new BudgetRepo(prisma);
  budgetService = new BudgetService(budgetRepo);
});

afterEach(async () => {
  await resetDatabase(prisma);
});

const setupBudgetCreation = async () => {
  const user = await createUser(prisma);
  const categoryInput = MockCategories.map((item) => {
    const { id, ...rest } = item;
    return rest;
  });

  const categories = await createCategories(categoryInput, prisma, user.id);
  const budgetItemsInput: CreateBudgetItemInput[] = categories.map((i) => {
    const { id } = i;
    return {
      categoryId: id,
      budgetAmount: 200000,
      isExpense: true,
      isIncome: false,
    };
  });

  return { user, budgetItemsInput };
};

describe('Budget Creation', () => {
  it('Creates and returns the budget & items given correct input', async () => {
    const { user, budgetItemsInput } = await setupBudgetCreation();

    const budget = await budgetService.newBudget(
      {
        month: 'August',
        year: 2021,
        items: budgetItemsInput,
      },
      user.id,
    );

    expect(budget.data).toBeTruthy();
    expect(budget.error).toBeUndefined();
    expect(budget.data!.items).toHaveLength(budgetItemsInput.length);
    expect(budget.data!.month).toBe('August');
    expect(budget.data!.year).toBe(2021);
  });

  it('Prevents a duplicate budget being created with the same month/year for a user', async () => {
    const { user, budgetItemsInput } = await setupBudgetCreation();

    const input = { month: 'August', year: 2021, items: budgetItemsInput };

    // Create the first budget
    await budgetService.newBudget(input, user.id);

    // Create the [Invalid] budget with the same dates
    const response = await budgetService.newBudget(input, user.id);

    expect(response.data).toBeUndefined();
    expect(response.error).toBeTruthy();
    expect(response.error).toHaveProperty('message');
  });
});
