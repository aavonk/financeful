import type { ModifiedCategory } from '@Context/create-budget/createBudgetContext';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';

export const getIncomeCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === true);
};

export const getExpenseCategories = (cats: ModifiedCategory[]): ModifiedCategory[] => {
  return cats.filter((item) => item.isIncome === false);
};

export const getTotalAmount = (cats: ModifiedCategory[]) => {
  const amount = cats.reduce((total, item) => total + item.currentMonth, 0);

  return formatMoneyFromCentsToDollars(amount);
};
