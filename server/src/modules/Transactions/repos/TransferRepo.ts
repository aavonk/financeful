import { PrismaClient } from '@prisma/client';
import { Account, Transaction } from '@Shared/types';
import { Transfer, TransferInput } from '../types/transfer.types';
import { nanoid } from 'nanoid';

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

export class TransferRepo implements ITransferRepo {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  public validateAccounts(input: TransferInput): boolean {
    const { fromAccount, toAccount } = input;
    if (fromAccount === toAccount) {
      return false;
    }
    return true;
  }

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

    if (!transactions || !transactions.length) {
      throw new Error('No Transfer found');
    }

    const fromAccount: Transaction = transactions.filter(
      (transaction) => transaction.isCashOut,
    )[0];

    const toAccount: Transaction = transactions.filter(
      (transaction) => transaction.isCashIn,
    )[0];

    const transfer: Transfer = {
      id: fromAccount.transferId!,
      date: fromAccount.date,
      fromAccount: fromAccount.account!,
      toAccount: toAccount.account!,
      category: fromAccount.category ? fromAccount.category : null,
      amount: toAccount.amount,
      description: fromAccount.description || null,
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

  public async createTransfer(
    input: TransferInput,
    userId: string,
  ): Promise<Transaction[]> {
    const accounts: Account[] = await this.client.account.findMany({
      where: {
        userId,
      },
    });

    const accountLeaving: Account = accounts.filter(
      (account) => account.id === input.fromAccount,
    )[0];
    const accountEntering: Account = accounts.filter(
      (account) => account.id === input.toAccount,
    )[0];

    const transferIdentifier: string = nanoid();
    const transferDate = new Date(input.date);

    const expense = this.client.transaction.create({
      data: {
        date: transferDate,
        payee: `Transfer to ${accountEntering.accountName}`,
        description: input.description || null,
        amount: input.amount * -1,
        type: 'TRANSFER',
        accountId: accountLeaving.id,
        userId,
        categoryId: input.categoryId || null,
        isCashIn: false,
        isCashOut: true,
        isTransfer: true,
        isUncategorized: !input.categoryId,
        transferId: transferIdentifier,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
      },
    });

    const income = this.client.transaction.create({
      data: {
        date: transferDate,
        payee: `Transfer from ${accountLeaving.accountName}`,
        description: input.description || null,
        amount: input.amount,
        type: 'TRANSFER',
        accountId: accountEntering.id,
        userId,
        categoryId: input.categoryId || null,
        isCashIn: true,
        isCashOut: false,
        isTransfer: true,
        isUncategorized: !input.categoryId,
        transferId: transferIdentifier,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
      },
    });

    const transactions = await this.client.$transaction([expense, income]);

    return transactions;
  }

  public async updateTransfer(
    input: TransferInput,
    transferId: string,
    userId: string,
  ): Promise<Transaction[]> {
    await this.deleteTransfer(transferId, userId);
    const transactions: Transaction[] = await this.createTransfer(
      input,
      userId,
    );

    return transactions;
  }
}
