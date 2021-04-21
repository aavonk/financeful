import { PrismaClient } from '@prisma/client';
import { IAccountRepo } from '../accountRepo';
import { Account } from '@Shared/types/Account';
import {
  CreateAccountInput,
  EditAccountInput,
} from '../../types/account.types';
import { BankAccount } from '../../domain/bankAccount';

export class AccountRepo implements IAccountRepo {
  private client: PrismaClient;
  private accountModel: PrismaClient['account'];

  constructor(database: PrismaClient) {
    this.client = database;
    this.accountModel = database.account;
  }

  async getOneAccount(id: string, userId: string): Promise<Account | null> {
    return await this.accountModel.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
  async getAccounts(userId: string): Promise<Account[]> {
    const accounts: Account[] = await this.accountModel.findMany({
      where: {
        userId,
      },
      orderBy: [{ updatedAt: 'desc' }, { accountName: 'asc' }],
    });

    return accounts;
  }

  async createAccount(
    userId: string,
    input: CreateAccountInput,
  ): Promise<Account> {
    const bankAccount = new BankAccount(input).toValue();

    const account = await this.accountModel.create({
      data: {
        ...bankAccount,
        userId,
      },
    });

    return account;
  }

  async editAccount(
    userId: string,
    accountId: string,
    input: EditAccountInput,
  ): Promise<Account> {
    const account = await this.getOneAccount(accountId, userId);

    if (!account) {
      throw new Error('No account found');
    }

    if (account.userId !== userId) {
      throw new Error('Unauthorized');
    }
    const { classification, ...inputData } = input;
    return await this.accountModel.update({
      where: {
        id: accountId,
      },
      data: {
        ...inputData,
        isAsset: classification === 'ASSET',
        isLiability: classification === 'LIABILITY',
      },
    });
  }

  async toggleAccountActiveStatus(
    userId: string,
    accountId: string,
  ): Promise<Account> {
    const accountToUpdate = await this.getOneAccount(accountId, userId);

    if (!accountToUpdate) {
      throw new Error('No account found by that ID');
    }

    if (accountToUpdate.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return await this.accountModel.update({
      where: {
        id: accountToUpdate.id,
      },
      data: {
        isInactive: !accountToUpdate.isInactive,
      },
    });
  }

  async deleteAccount(userId: string, accountId: string): Promise<void> {
    const accountToDelete = await this.getOneAccount(accountId, userId);

    if (!accountToDelete) {
      throw new Error('No account found by that ID');
    }

    if (accountToDelete.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await this.client.user.update({
      where: {
        id: userId,
      },
      data: {
        transactions: {
          deleteMany: {
            accountId: accountToDelete.id,
          },
        },
        account: {
          delete: {
            id: accountToDelete.id,
          },
        },
      },
    });
  }
}
