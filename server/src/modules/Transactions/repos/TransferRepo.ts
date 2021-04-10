import { Transaction } from '@Shared/types';
import { Transfer, TransferInput } from '../types/transfer.types';

export interface ITransferRepo {
  getTransfer(id: string): Promise<Transfer>;
  getTransferTransactions(id: string, userId: string): Promise<Transaction[]>;
  deleteTransfer(id: string, userId: string): Promise<void>;
  createTransfer(input: TransferInput, userId: string): Promise<Transaction[]>;
  updateTransfer(
    input: TransferInput,
    transferId: string,
    userId: string,
  ): Promise<Transaction[]>;
  validateAccounts(input: TransferInput): boolean;
}
