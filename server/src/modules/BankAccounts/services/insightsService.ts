import { Transaction } from '@Shared/types';

type TotalTypesResponse = {
  income: number;
  expenses: number;
  transfers: number;
};
export interface IInsightsService {
  calculateTotalTransactionTypes(
    transactions: Transaction[],
  ): Promise<TotalTypesResponse>;
}
