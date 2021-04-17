import { IAccountRepo } from '../accountRepo';
import { DataSource } from '@Shared/core/DataSource';
import { Account } from '@Shared/types/Account';
import {
  CreateAccountInput,
  EditAccountInput,
} from '../../types/account.types';
import { BankAccount } from '../../domain/bankAccount';

export class AccountRepo extends DataSource implements IAccountRepo {
  constructor() {
    super();
  }

  async getOneAccount(id: string, userId: string): Promise<Account | null> {
    return await this.client.account.findFirst({
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
      orderBy: {
        accountName: 'asc',
      },
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
    return await this.client.account.update({
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
}
