import { GetBalanceParams, HistoryObject } from '../types/accountData.types';

export interface IAccountDataRepo {
  getBalances(
    params: GetBalanceParams,
    userId: string,
  ): Promise<HistoryObject[]>;
}
