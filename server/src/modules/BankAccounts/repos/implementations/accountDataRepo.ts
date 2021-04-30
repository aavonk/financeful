import { IDataBase, DailyBalance } from '@Shared/types/';
import { IAccountDataRepo } from '../accountDataRepo';
import { GetBalanceParams } from '../../types/accountData.types';
import { DateUtils } from '@Shared/utils/DateUtils';

export class AccountDataRepo implements IAccountDataRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  async getBalances(
    params: GetBalanceParams,
    userId: string,
  ): Promise<DailyBalance[]> {
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
    }));
  }
}
