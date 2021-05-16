import { Transaction } from '@Shared/types';
import { InsightDetails } from '../types/accountData.types';

export type ComparisonResult = {
  percentageOfIncome: number;
  percentageOfExpenses: number;
  lastMonthsIncome: number;
  lastMonthsExpenses: number;
};

export interface IInsightsService {
  calculateTotalTransactionTypes(transactions: Transaction[]): InsightDetails;
  compareCurrentAndPreviousMonths(
    currentTotals: InsightDetails,
    previousTotals: InsightDetails,
  ): ComparisonResult;
}
