import {
  AssetsAndLiabilitesResponse,
  HistoryObject,
} from '@Modules/BankAccounts/types/accountData.types';
import { IDataBase, Account, RangeParams } from '@Shared/types';
import { IAggregateAccountData } from '../aggregateAccountData';
import { MoneyUtils } from '@Shared/utils/moneyUtils';
import { DateUtils } from '@Shared/utils/DateUtils';

export class AggregateAccountData implements IAggregateAccountData {
  private readonly client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  private calculateAggregateTotal(accounts: Account[]): number {
    return accounts.reduce((total, obj) => obj.balance! + total, 0);
  }

  public async getAssetsAndLiabilites(
    userId: string,
  ): Promise<AssetsAndLiabilitesResponse> {
    const bankAccounts = await this.client.account.findMany({
      where: {
        userId,
      },
      orderBy: {
        accountName: 'asc',
      },
      select: {
        accountName: true,
        balance: true,
        isAsset: true,
        isLiability: true,
        id: true,
      },
    });

    const data = bankAccounts.map((account) => ({
      ...account,
      balance: MoneyUtils.convertToFloat(account.balance),
    }));

    return {
      accounts: data,
      aggregateBalance: MoneyUtils.convertToFloat(
        this.calculateAggregateTotal(bankAccounts),
      ),
    };
  }

  public async getBalanceHistories(
    userId: string,
    range: RangeParams,
  ): Promise<HistoryObject[]> {
    const { startDate, endDate } = range;

    const aggregatedBalances = await this.client.dailyBalances.groupBy({
      by: ['date'],
      where: {
        AND: [
          {
            userId,
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        ],
      },
      sum: {
        amount: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const data = aggregatedBalances.map((item) => ({
      date: DateUtils.formatNumericDate(item.date),
      balance: MoneyUtils.convertToFloat(item.sum.amount!),
    }));

    return data;
  }
}
