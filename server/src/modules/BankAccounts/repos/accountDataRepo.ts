import { DailyBalance } from '@Shared/types/DailyBalance';
import { GetBalanceParams } from '../types/accountData.types';

export interface IAccountDataRepo {
  getBalances(
    params: GetBalanceParams,
    userId: string,
  ): Promise<DailyBalance[]>;
}
