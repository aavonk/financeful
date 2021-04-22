import { AggregateBalanceResponse } from '../types/accountData.types';

export interface IAggregateAccountData {
  getCurrentBalances(userId: string): Promise<AggregateBalanceResponse>;
}
