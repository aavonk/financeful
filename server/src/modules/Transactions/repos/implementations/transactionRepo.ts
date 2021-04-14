import { DataSource } from '@Shared/core/DataSource';
import { Transaction } from '@Shared/types';
import { ITransactionRepo } from '../transactionRepo';
import { TransactionInput } from '../../types/transaction.types';

export class TransactionRepo extends DataSource implements ITransactionRepo {
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

  public async findMany(userId: string): Promise<Transaction[]> {
    const options = this.createQueryOptions();
    return await this.client.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      ...options,
    });
  }

  public async findOne(id: string): Promise<Transaction | null> {
    const options = this.createQueryOptions();

    return await this.client.transaction.findUnique({
      where: {
        id: id,
      },
      ...options,
    });
  }

  public async createOne(
    input: TransactionInput,
    userId: string,
  ): Promise<Transaction> {
    const baseOptions = this.createQueryOptions();

    let transactionDate = new Date(input.date);
    const { accountId, ...filteredInput } = input;
    console.log({ input: input.amount });

    const updatedAccount = await this.client.account.update({
      where: {
        id: input.accountId,
      },
      data: {
        balance:
          input.type === 'INCOME'
            ? { increment: input.amount }
            : { decrement: input.amount },
        transaction: {
          create: {
            ...filteredInput,
            userId,
            date: transactionDate,
            categoryId: input.categoryId ? input.categoryId : null,
            amount: input.type === 'INCOME' ? input.amount : input.amount * -1,
            isCashIn: input.type === 'INCOME',
            isCashOut: input.type === 'EXPENSE',
            isTransfer: false,
            isUncategorized: !input.categoryId,
          },
        },
      },
      select: {
        transaction: {
          where: {
            date: transactionDate,
          },
          ...baseOptions,
        },
      },
    });

    const newTransaction = updatedAccount.transaction[0];

    return newTransaction;
  }

  public async deleteOne(id: string, userId: string): Promise<void> {
    const transaction = await this.client.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new Error('Unable to find transaction by that ID');
    }

    if (transaction.userId !== userId) {
      throw new Error('Not authorized to perform this action');
    }

    const deleteTransaction = this.client.transaction.delete({
      where: { id },
    });

    const updateAccount = this.client.account.update({
      where: {
        id: transaction.accountId,
      },
      data: {
        balance: transaction.isCashIn
          ? { decrement: transaction.amount }
          : { increment: transaction.amount * -1 },
      },
    });
    await this.client.$transaction([deleteTransaction, updateAccount]);
  }
}
