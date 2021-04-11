import { Account } from '@Shared/types/Account';

export interface IAccountRepo {
  getAccounts(userId: string): Promise<Account[]>;
}
