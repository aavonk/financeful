import { Transfer } from '../types/transfer.types';
import { Transaction } from '../../../types/Transaction';
import { PrismaClient } from '@prisma/client';

export interface TransferService {
  getTransfer(id: string): Promise<Transfer>;
  getTransferTransactions(id: string, userId: string): Promise<Transaction[]>;
  deleteTransfer(id: string, userId: string): Promise<void>;
}

export class TransferRepo implements TransferService {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  //TODO: add transferId property to Transfer type and response
  public async getTransfer(id: string): Promise<Transfer> {
    const transactions: Transaction[] = await this.client.transaction.findMany({
      where: {
        transferId: id,
      },
      include: {
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!transactions) {
      throw new Error('No Transfer found');
    }

    const fromAccount: Transaction = transactions.filter(
      (transaction) => transaction.isCashOut,
    )[0];

    const toAccount: Transaction = transactions.filter(
      (transaction) => transaction.isCashIn,
    )[0];

    const transfer: Transfer = {
      date: fromAccount.date,
      fromAccount: fromAccount.account!,
      toAccount: toAccount.account!,
      category: fromAccount.category ? fromAccount.category : null,
    };

    return transfer;
  }

  public async getTransferTransactions(
    id: string,
    userId: string,
  ): Promise<Transaction[]> {
    const transactions = await this.client.transaction.findMany({
      where: {
        transferId: id,
        userId,
      },
    });

    return transactions;
  }

  public async deleteTransfer(id: string, userId: string): Promise<void> {
    await this.client.transaction.deleteMany({
      where: {
        transferId: id,
        userId,
      },
    });
  }
}
