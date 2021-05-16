import { IInsightsService } from '../insightsService';
import { InsightDetails } from '../../types/accountData.types';
import { Transaction } from '@Shared/types';

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
}
