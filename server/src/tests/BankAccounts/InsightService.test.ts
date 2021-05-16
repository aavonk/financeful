import { ComparisonResult } from '@Modules/BankAccounts/services/insightsService';
import { InsightDetails } from '@Modules/BankAccounts/types/accountData.types';
import { InsightsService } from '@Modules/BankAccounts/services/implementations/insightService';
import {
  TRANSACTION_TOTALS,
  MOCK_TRANSACTIONS,
} from '../fixtures/transactions';

describe('Insight Service Calculations', () => {
  const insightService = new InsightsService();

  it('Calculates total Income, Expense, and Transfers', () => {
    const value = insightService.calculateTotalTransactionTypes(
      MOCK_TRANSACTIONS,
    );

    const incomeTotal = TRANSACTION_TOTALS.incomeFloat;
    const expenseTotal = TRANSACTION_TOTALS.expenseFloat;
    const transferTotal = TRANSACTION_TOTALS.transferFloat;

    expect(value.income).toBe(incomeTotal);
    expect(value.expenses).toBe(expenseTotal);
    expect(value.transfers).toBe(transferTotal);
  });

  it('Calculates current vs previous months percentages', () => {
    const currentMonth: InsightDetails = {
      income: 50,
      expenses: 80,
      transfers: 0,
    };

    const previousMonth: InsightDetails = {
      income: 100,
      expenses: 50,
      transfers: 0,
    };

    const expectedResult: ComparisonResult = {
      percentageOfIncome: -50,
      percentageOfExpenses: 60,
      lastMonthsIncome: 100,
      lastMonthsExpenses: 50,
    };
    const value = insightService.compareCurrentAndPreviousMonths(
      currentMonth,
      previousMonth,
    );

    expect(value.percentageOfIncome).toBe(expectedResult.percentageOfIncome);
    expect(value.percentageOfExpenses).toBe(
      expectedResult.percentageOfExpenses,
    );
    expect(value).toEqual(expectedResult);
  });
});
