import { Transaction } from '@Shared/types';
import { TransactionInput } from '../types/transaction.types';
import { RangeParams } from '@Shared/types';

export interface ITransactionService {
  createOne(input: TransactionInput, userId: string): Promise<Transaction>;
  deleteOne(id: string, userId: string): Promise<Transaction>;
  findMany(userId: string): Promise<Transaction[]>;
  findOne(id: string, userId: string): Promise<Transaction>;
  updateOne(
    input: TransactionInput,
    id: string,
    userId: string,
  ): Promise<Transaction>;
  getRange(
    range: RangeParams,
    userId: string,
    accountId?: string,
  ): Promise<Transaction[]>;
}
