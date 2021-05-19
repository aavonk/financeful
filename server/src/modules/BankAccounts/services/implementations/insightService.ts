import { IInsightsService, ComparisonResult } from '../insightsService';
import { InsightDetails } from '../../types/accountData.types';
import { Transaction } from '@Shared/types';
import { MoneyUtils } from '@Shared/utils/MoneyUtils';

type SeperatedTransactions = {
  income: Transaction[];
  expenses: Transaction[];
  transfers: Transaction[];
};

export class InsightsService implements IInsightsService {
  private seperateTypes(transactions: Transaction[]): SeperatedTransactions {
    const income = transactions.filter(
      (item) => item.isCashIn === true && item.isTransfer === false,
    );
    const expenses = transactions.filter(
      (item) => item.isCashOut === true && item.isTransfer === false,
    );
    const transfers = transactions.filter((item) => item.isTransfer === true);

    return {
      income,
      transfers,
      expenses,
    };
  }

  private calculateTotal(transactions: Transaction[]): number {
    if (!transactions.length) return 0;
    let amount = transactions.reduce((total, item) => item.amount + total, 0);

    if (amount < 0) {
      amount = amount * -1;
    }
    return amount / 100;
  }

  /* 
    Takes in the previous months number and a current number and calculates the percentage of differences
    example: Current Month: 100, Previous Month: 50 -- returns 100 (100% more than previous month).
    example: Curent Month: 50, Previouse Month: 100 -- returns -50 (50% less than previous month).

    In formula: 
    ((Current - Previous) * 100)/Previous
  */
  private calculatePercentageOfDifferences(
    current: number,
    previous: number,
  ): number {
    const amount = ((current - previous) * 100) / previous;
    if (Number.isNaN(amount)) return 0;
    if (!Number.isFinite(amount)) return 0;
    return Number(amount.toFixed(2));
  }

  public calculateTotalTransactionTypes(
    transactions: Transaction[],
  ): InsightDetails {
    const { income, expenses, transfers } = this.seperateTypes(transactions);

    return {
      income: this.calculateTotal(income),
      expenses: this.calculateTotal(expenses),
      transfers: this.calculateTotal(transfers),
    };
  }

  public compareCurrentAndPreviousMonths(
    currentTotals: InsightDetails,
    previousTotals: InsightDetails,
  ): ComparisonResult {
    const incomeDifference = this.calculatePercentageOfDifferences(
      currentTotals.income,
      previousTotals.income,
    );
    const expenseDifference = this.calculatePercentageOfDifferences(
      currentTotals.expenses,
      previousTotals.expenses,
    );

    return {
      percentageOfIncome: incomeDifference,
      percentageOfExpenses: expenseDifference,
      lastMonthsExpenses: previousTotals.expenses,
      lastMonthsIncome: previousTotals.income,
    };
  }

  public formatInsightMessage(
    currentTotals: InsightDetails,
    previousTotals: InsightDetails,
  ): string {
    const {
      percentageOfIncome,
      percentageOfExpenses,
      lastMonthsIncome,
    } = this.compareCurrentAndPreviousMonths(currentTotals, previousTotals);

    const isExpenseNegative = percentageOfExpenses < 0;
    const isIncomeNegative = percentageOfIncome < 0;

    const formattedPercentageOfExpenses = isExpenseNegative
      ? percentageOfExpenses * -1
      : percentageOfExpenses;
    const formattedPercentageOfIncome =
      percentageOfIncome < 0 ? percentageOfIncome * -1 : percentageOfIncome;

    return `So far you've spent ${MoneyUtils.formatCurrency(
      currentTotals.expenses,
    )}, which is ${formattedPercentageOfExpenses}% ${
      isExpenseNegative ? 'less' : 'more'
    } than last month. Last month, you brought in ${MoneyUtils.formatCurrency(
      lastMonthsIncome,
    )}, which is ${formattedPercentageOfIncome}% ${
      isIncomeNegative ? 'more' : 'less'
    } than this month.
      `.trim();
  }
}
