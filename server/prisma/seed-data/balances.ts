import { PrismaClient } from '.prisma/client';
import { getRandomAccountId } from './accounts';
import { Account } from '../../src/shared/types/Account';

type Balance = {
  amount: number;
  date: Date | string;
};

const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 4 months worth of dates
export const generateBalanceObjects = (): Balance[] => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  // const dates = getDaysInMonth(month, year);
  const dates = [];
  for (let i = 0; i < 4; i++) {
    const temp = getDaysInMonth(month - i, year);
    dates.push(...temp);
  }

  const arr: Balance[] = [];

  for (let date of dates) {
    const balanceItem: Balance = {
      amount: randomNumber(100000, 200000),
      date: date,
    };

    arr.push(balanceItem);
  }

  return arr;
};

export const createBankBalances = async (
  userId: string,
  accounts: Account[],
  prisma: PrismaClient,
): Promise<void> => {
  const bankBalances = generateBalanceObjects().map((item) => {
    const accountId = getRandomAccountId(accounts);
    return {
      ...item,
      userId: userId,
      accountId,
    };
  });

  for (let balance of bankBalances) {
    await prisma.dailyBalances.create({
      data: balance,
    });
  }
};
