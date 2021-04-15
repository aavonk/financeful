import { Account, Transaction } from '@Shared/types';
import { Transfer, TransferInput } from '../../types/transfer.types';
import { nanoid } from 'nanoid';
import { ITransferRepo } from '../transferRepo';
import { DataSource } from '@Shared/core/DataSource';

export class TransferRepo extends DataSource implements ITransferRepo {
  constructor() {
    super();
  }

  private createQueryOptions(): any {
    return {
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
    };
  }
  public validateAccounts(input: TransferInput): boolean {
    const { fromAccount, toAccount } = input;
    if (fromAccount === toAccount) {
      return false;
    }
    return true;
  }

  public async getTransfer(id: string): Promise<Transfer> {
    const baseOptions = this.createQueryOptions();
    const transactions: Transaction[] = await this.client.transaction.findMany({
      where: {
        transferId: id,
      },
      ...baseOptions,
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
    const baseOptions = this.createQueryOptions();
    const transactions = await this.client.transaction.findMany({
      where: {
        transferId: id,
        userId,
      },
      ...baseOptions,
    });

    return transactions;
  }

  public async deleteTransfer(id: string, userId: string): Promise<void> {
    const transactions = await this.getTransferTransactions(id, userId);

    const expenseTransaction = transactions.filter((item) => item.isCashOut)[0];

    const incomeTransaction = transactions.filter((item) => item.isCashIn)[0];

    const reverseExpesnseFromAccount = this.client.account.update({
      where: {
        id: expenseTransaction.accountId,
      },
      data: {
        balance: { increment: expenseTransaction.amount * -1 },
        transaction: {
          delete: {
            id: expenseTransaction.id,
          },
        },
      },
    });

    const reverseIncomeFromAccount = this.client.account.update({
      where: {
        id: incomeTransaction.accountId,
      },
      data: {
        balance: { decrement: incomeTransaction.amount },
        transaction: {
          delete: {
            id: incomeTransaction.id,
          },
        },
      },
    });

    await this.client.$transaction([
      reverseExpesnseFromAccount,
      reverseIncomeFromAccount,
    ]);
  }

  public async createTransfer(
    input: TransferInput,
    userId: string,
  ): Promise<Transaction[]> {
    const baseOptions = this.createQueryOptions();
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

    if (!accountLeaving || !accountEntering) {
      throw new Error('No accounts found by those IDs');
    }

    const transferIdentifier: string = nanoid();
    const transferDate = new Date(input.date);

    const accountWithExpense = this.client.account.update({
      where: {
        id: accountLeaving.id,
      },
      data: {
        balance: { decrement: input.amount },
        transaction: {
          create: {
            date: transferDate,
            payee: `Transfer to ${accountEntering.accountName}`,
            description: input.description || null,
            amount: input.amount * -1,
            type: 'TRANSFER',
            userId,
            categoryId: input.categoryId || null,
            isCashIn: false,
            isCashOut: true,
            isTransfer: true,
            isUncategorized: !input.categoryId,
            transferId: transferIdentifier,
          },
        },
      },
      select: {
        transaction: {
          where: {
            transferId: transferIdentifier,
            AND: {
              amount: {
                lt: 0,
              },
            },
          },
          ...baseOptions,
        },
      },
    });

    const accountWithIncome = this.client.account.update({
      where: {
        id: accountEntering.id,
      },
      data: {
        balance: { increment: input.amount },
        transaction: {
          create: {
            date: transferDate,
            payee: `Transfer from ${accountLeaving.accountName}`,
            description: input.description || null,
            amount: input.amount,
            type: 'TRANSFER',
            userId,
            categoryId: input.categoryId || null,
            isCashIn: true,
            isCashOut: false,
            isTransfer: true,
            isUncategorized: !input.categoryId,
            transferId: transferIdentifier,
          },
        },
      },
      select: {
        transaction: {
          where: {
            transferId: transferIdentifier,
            AND: {
              amount: {
                gt: 0,
              },
            },
          },
          ...baseOptions,
        },
      },
    });

    const result = await this.client.$transaction([
      accountWithExpense,
      accountWithIncome,
    ]);

    const transactions = result.map((res) => res.transaction[0]);

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
