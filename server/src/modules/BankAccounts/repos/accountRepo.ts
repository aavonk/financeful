import { Account, BalanceUpdateInfo, SuccessOrError } from '@Shared/types';
import { CreateAccountInput, EditAccountInput } from '../types/account.types';

export interface IAccountRepo {
  getOneAccount(id: string, userId: string): Promise<Account | null>;
  getAccounts(userId: string): Promise<Account[]>;
  createAccount(userId: string, input: CreateAccountInput): Promise<Account>;
  deleteAccount(userId: string, accountId: string): Promise<void>;
  editAccount(
    userId: string,
    accountId: string,
    input: EditAccountInput,
  ): Promise<Account>;
  toggleAccountActiveStatus(
    userId: string,
    accountId: string,
  ): Promise<Account>;
  updateBalance(
    updateInfo: BalanceUpdateInfo,
    accountId: string,
  ): Promise<SuccessOrError>;
}
