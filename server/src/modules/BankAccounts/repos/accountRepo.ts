import { Account } from '@Shared/types/Account';
import { CreateAccountInput } from '../types/account.types';

export interface IAccountRepo {
  getAccounts(userId: string): Promise<Account[]>;
  createAccount(userId: string, input: CreateAccountInput): Promise<Account>;
}
