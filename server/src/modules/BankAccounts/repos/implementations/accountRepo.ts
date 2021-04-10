import { IAccountRepo } from '../accountRepo';
import { DataSource } from '@Shared/core/DataSource';
import { Account } from '@Shared/types/Account';

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
}
