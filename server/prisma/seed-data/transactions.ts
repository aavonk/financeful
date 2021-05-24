import { PrismaClient } from '.prisma/client';
import faker from 'faker';
import { Category, Account } from '../../src/shared/types';
import { getRandomAccountId } from './accounts';
import { randomNumber as generateRandomNumber } from './balances';

export const getRandomCategoryId = (categories: Category[]): string => {
  const index = generateRandomNumber(0, categories.length - 1);
  const cat = categories[index];
  return cat.id;
};

type TransactionTemplate = {
  payee: string;
  description: string;
  amount: number;
  date: Date;
  isTransfer: boolean;
  transferId: null;
};

export const makeTransactions = (amount: number): TransactionTemplate[] => {
  const arr: TransactionTemplate[] = [];

  for (let i = 0; i < amount; i++) {
    arr.push({
      payee: faker.name.findName(),
      description: faker.finance.transactionDescription(),
      amount: Number(faker.finance.amount(-2000, 3000, 0)),
      date: faker.date.recent(90, new Date()),
      isTransfer: false,
      transferId: null,
    });
  }
  return arr;
};

export const createTransactions = async (
  userId: string,
  accounts: Account[],
  categories: Category[],
  prisma: PrismaClient,
): Promise<void> => {
  const transactionTemplates = makeTransactions(100).map((item) => ({
    ...item,
    categoryId: getRandomCategoryId(categories),
    isCashIn: item.amount > 0,
    isCashOut: item.amount < 0,
    isUncategorized: false,
    userId: userId,
    accountId: getRandomAccountId(accounts),
    amount: Number(item.amount) * 100,
    type: item.amount > 0 ? 'INCOME' : 'EXPENSE',
  }));

  for (let item of transactionTemplates) {
    await prisma.transaction.create({
      //@ts-ignore
      data: item,
    });
  }
};
