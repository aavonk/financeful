import { IDataBase } from '@Shared/types/';
import { IAccountDataRepo } from '../accountDataRepo';
import { GetBalanceParams, HistoryObject } from '../../types/accountData.types';
import { DateUtils } from '@Shared/utils/DateUtils';
import { MoneyUtils } from '@Shared/utils/MoneyUtils';

export class AccountDataRepo implements IAccountDataRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  async getBalances(
    params: GetBalanceParams,
    userId: string,
  ): Promise<HistoryObject[]> {
    const { accountId, startDate, endDate } = params;
    const balances = await this.client.dailyBalances.findMany({
      where: {
        AND: [
          {
            date: {
              gte: startDate,
              lte: endDate,
            },
            userId,
            accountId,
          },
        ],
      },
    });

    return balances.map((item) => ({
      ...item,
      date: DateUtils.formatNumericDate(item.date),
      balance: MoneyUtils.convertToFloat(item.amount),
    }));
  }
}
