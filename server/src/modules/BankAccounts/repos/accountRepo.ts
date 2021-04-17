import { Account } from '@Shared/types/Account';
import { CreateAccountInput, EditAccountInput } from '../types/account.types';

export interface IAccountRepo {
  getOneAccount(id: string, userId: string): Promise<Account | null>;
  getAccounts(userId: string): Promise<Account[]>;
  createAccount(userId: string, input: CreateAccountInput): Promise<Account>;
  editAccount(
    userId: string,
    accountId: string,
    input: EditAccountInput,
  ): Promise<Account>;
}
