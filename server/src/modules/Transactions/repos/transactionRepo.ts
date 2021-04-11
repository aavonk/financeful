import { Transaction } from '@Shared/types';
import { TransactionInput } from '../types/transaction.types';

export interface ITransactionRepo {
  findMany(userId: string): Promise<Transaction[]>;
  findOne(id: string): Promise<Transaction | null>;
  createOne(input: TransactionInput, userId: string): Promise<Transaction>;
  deleteOne(id: string): Promise<void>;
  updateOne(id: string, input: TransactionInput): Promise<Transaction>;
}