import { Category } from '../../src/shared/types';

import { randomNumber as generateRandomNumber } from './balances';
import faker from 'faker';
/*
  Add:
  userId,
  categoryId
*/

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
  const arr = [];

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
