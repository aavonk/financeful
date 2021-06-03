import { Transaction } from '@Shared/types';
import { TransactionInput } from '../types/transaction.types';
import { RangeParams } from '@Shared/types';

export interface ITransactionRepo {
  createOne(input: TransactionInput, userId: string): Promise<Transaction>;
  findMany(userId: string): Promise<Transaction[]>;
  findOne(id: string): Promise<Transaction | null>;
  deleteOne(id: string): Promise<Transaction>;
  getRangeForOneAccount(
    range: RangeParams,
    accountId: string,
    userId: string,
  ): Promise<Transaction[]>;

  getRangeForAllAccounts(
    range: RangeParams,
    userId: string,
  ): Promise<Transaction[]>;
  getUncategorizedLength(userId: string): Promise<number>;
  getUncategorizedTransactions(userId: string): Promise<Transaction[]>;
}
