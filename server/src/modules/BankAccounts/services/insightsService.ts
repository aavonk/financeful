import { Transaction } from '@Shared/types';
import { InsightDetails } from '../types/accountData.types';

export interface IInsightsService {
  calculateTotalTransactionTypes(
    transactions: Transaction[],
  ): Promise<InsightDetails>;
}
