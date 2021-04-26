import { Transaction } from '@Shared/types';
import { TransactionInput } from '../types/transaction.types';
import { RangeParams } from '@Shared/types';

export interface ITransactionRepo {
  findMany(userId: string): Promise<Transaction[]>;
  findOne(id: string): Promise<Transaction | null>;
  createOne(input: TransactionInput, userId: string): Promise<Transaction>;
  deleteOne(id: string, userId: string): Promise<void>;
  getRange(range: RangeParams, userId: string): Promise<Transaction[]>;
  // updateOne(id: string, input: TransactionInput, userId: string): Promise<Transaction>;
}
