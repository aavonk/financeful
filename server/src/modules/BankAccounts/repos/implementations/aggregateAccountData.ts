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

  private calculatePercentageOfAssets(
    assets: Account[],
    liabilites: Account[],
  ): number {
    const assetsTotal = this.calculateAggregateTotal(assets);
    let liabilitesTotal = this.calculateAggregateTotal(liabilites);

    if (liabilitesTotal < 0) {
      liabilitesTotal = liabilitesTotal * -1;
    }

    let result = Math.round((liabilitesTotal / assetsTotal) * 100);

    if (Number.isNaN(result)) result = 0;
    if (!Number.isFinite(result)) result = 100;

    return result;
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

    const assets = bankAccounts.filter((acct) => acct.isAsset === true);
    const liabilites = bankAccounts.filter((acct) => acct.isLiability === true);

    return {
      aggregateBalance: MoneyUtils.convertToFloat(
        this.calculateAggregateTotal(bankAccounts),
      ),
      assets: {
        amount: MoneyUtils.convertToFloat(this.calculateAggregateTotal(assets)),
      },
      liabilites: {
        amount: MoneyUtils.convertToFloat(
          this.calculateAggregateTotal(liabilites) * -1,
        ),
        percentOfAssets: this.calculatePercentageOfAssets(assets, liabilites),
      },
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
