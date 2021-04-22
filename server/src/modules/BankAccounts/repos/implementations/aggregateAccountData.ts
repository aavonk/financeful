import { AggregateBalanceResponse } from '@Modules/BankAccounts/types/accountData.types';
import { IDataBase, Account } from '@Shared/types';
import { IAggregateAccountData } from '../aggregateAccountData';

export class AggregateAccountData implements IAggregateAccountData {
  private readonly client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  private calculateAggregateTotal(accounts: Account[]): number {
    return accounts.reduce((total, obj) => obj.balance! + total, 0);
  }

  private calculateAggregateAssets(accounts: Account[]): number {
    return accounts
      .filter((account) => account.isAsset === true)
      .reduce((total, acct) => acct.balance! + total, 0);
  }

  private calculateAggregateLiabilities(accounts: Account[]): number {
    return accounts
      .filter((account) => account.isLiability)
      .reduce((total, account) => account.balance! + total, 0);
  }

  public async getCurrentBalances(
    userId: string,
  ): Promise<AggregateBalanceResponse> {
    const accounts: Account[] = await this.client.account.findMany({
      where: {
        userId,
      },
      orderBy: {
        accountName: 'asc',
      },
    });

    const response: AggregateBalanceResponse = {
      accounts,
      aggregateBalance: this.calculateAggregateTotal(accounts),
      totalAssets: this.calculateAggregateAssets(accounts),
      totalLiabilities: this.calculateAggregateLiabilities(accounts),
    };

    return response;
  }
}
