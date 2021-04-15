import { IAccountRepo } from '../accountRepo';
import { DataSource } from '@Shared/core/DataSource';
import { Account } from '@Shared/types/Account';
import { CreateAccountInput } from '../../types/account.types';

export class AccountRepo extends DataSource implements IAccountRepo {
  constructor() {
    super();
  }

  async getAccounts(userId: string): Promise<Account[]> {
    const accounts: Account[] = await this.client.account.findMany({
      where: {
        userId,
      },
    });

    return accounts;
  }

  async createAccount(
    userId: string,
    input: CreateAccountInput,
  ): Promise<Account> {
    const { classification, ...inputData } = input;
    const account = await this.client.account.create({
      data: {
        ...inputData,
        isAsset: classification === 'ASSET',
        isLiability: classification === 'LIABILITY',
        userId,
      },
    });

    return account;
  }
}
