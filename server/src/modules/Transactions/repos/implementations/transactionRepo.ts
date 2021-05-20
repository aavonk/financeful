import { Transaction, RangeParams } from '@Shared/types';
import { ITransactionRepo } from '../transactionRepo';
import { IDataBase } from '@Shared/database/IDataBase';
import { TransactionInput } from '@Modules/Transactions/types/transaction.types';

export class TransactionRepo implements ITransactionRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
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

  public async getRangeForOneAccount(
    range: RangeParams,
    accountId: string,
    userId: string,
  ): Promise<Transaction[]> {
    const options = this.createQueryOptions();
    const { startDate, endDate } = range;

    return await this.client.transaction.findMany({
      where: {
        AND: [
          {
            userId,
            accountId,
            date: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          },
        ],
      },
      orderBy: {
        date: 'desc',
      },
      ...options,
    });
  }

  public async getRangeForAllAccounts(
    range: RangeParams,
    userId: string,
  ): Promise<Transaction[]> {
    const options = this.createQueryOptions();
    const { startDate, endDate } = range;
    return await this.client.transaction.findMany({
      where: {
        userId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: {
        date: 'desc',
      },
      ...options,
    });
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
    const options = this.createQueryOptions();

    const transaction = await this.client.transaction.create({
      data: {
        ...input,
        categoryId: input.categoryId ? input.categoryId : null,
        amount: input.type === 'INCOME' ? input.amount : input.amount * -1,
        isCashIn: input.type === 'INCOME',
        isCashOut: input.type === 'EXPENSE',
        isTransfer: false,
        isUncategorized: !input.categoryId,
        userId,
      },
      ...options,
    });

    return transaction;
  }

  public async deleteOne(id: string): Promise<Transaction> {
    const transaction = this.client.transaction.delete({
      where: {
        id,
      },
    });

    return transaction;
  }
}
