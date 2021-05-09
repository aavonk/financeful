import { PrismaClient } from '.prisma/client';
import { Account } from '../../src/shared/types';
import { randomNumber } from './balances';

export const getRandomAccountId = (accounts: Account[]) => {
  const index = randomNumber(0, accounts.length - 1);
  return accounts[index].id;
};
export const accounts = [
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    accountName: 'Primary Checking',
    accountType: 'Checking Account',
    isAsset: true,
    isLiability: false,
    balance: 335400,
    bankName: 'Chase',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    accountName: 'Primary Savings',
    accountType: 'Savings Account',
    isAsset: true,
    isLiability: false,
    balance: 650000,
    bankName: 'Ally Savings',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    accountName: 'Credit Card',
    accountType: 'Credit',
    isAsset: false,
    isLiability: true,
    balance: -20000,
    bankName: 'Discover',
  },
];

export const createBankAccounts = async (
  userId: string,
  prisma: PrismaClient,
): Promise<Account[]> => {
  const bankAccounts = accounts.map((account) => ({
    ...account,
    userId: userId,
  }));

  const acct: Account[] = [];
  for (let account of bankAccounts) {
    const newAccount = await prisma.account.create({
      data: account,
    });
    acct.push(newAccount);
  }

  return acct;
};
