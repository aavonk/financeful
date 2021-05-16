import { InsightsService } from '@Modules/BankAccounts/services/implementations/insightService';
import {
  TRANSACTION_TOTALS,
  MOCK_TRANSACTIONS,
} from '../fixtures/transactions';

describe('Insight Service Calculations', () => {
  it('Calculates total Income, Expense, and Transfers', async () => {
    const insightService = new InsightsService();
    const value = await insightService.calculateTotalTransactionTypes(
      MOCK_TRANSACTIONS,
    );

    const incomeTotal = TRANSACTION_TOTALS.incomeFloat;
    const expenseTotal = TRANSACTION_TOTALS.expenseFloat;
    const transferTotal = TRANSACTION_TOTALS.transferFloat;

    expect(value.income).toBe(incomeTotal);
    expect(value.expenses).toBe(expenseTotal);
    expect(value.transfers).toBe(transferTotal);
  });
});
