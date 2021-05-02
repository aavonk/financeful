import {
  AssetsAndLiabilitesResponse,
  GetBalanceHistoriesResponse,
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
  ): Promise<GetBalanceHistoriesResponse> {
    const { startDate, endDate } = range;

    const balances = await this.client.dailyBalances.findMany({
      where: {
        AND: [
          {
            date: {
              gte: startDate,
              lte: endDate,
            },
            userId,
          },
        ],
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        userId: false,
        id: true,
        date: true,
        amount: true,
        accountId: true,
        account: {
          select: {
            accountName: true,
          },
        },
      },
    });
    //TODO: Add date range filter
    const testArr = await this.client.dailyBalances.groupBy({
      by: ['date'],
      where: {
        userId,
      },
      sum: {
        amount: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    console.log(testArr);
    const data: GetBalanceHistoriesResponse = {
      accountIds: [...new Set(balances.map((item) => item.accountId))],
      histories: balances.map((item) => {
        const { id, amount, account, ...rest } = item;
        return {
          ...rest,
          date: DateUtils.formatNumericDate(item.date),
          balance: MoneyUtils.convertToFloat(amount),
          balanceId: id,
          accountName: account.accountName,
        };
      }),
    };
    return data;
  }
}
