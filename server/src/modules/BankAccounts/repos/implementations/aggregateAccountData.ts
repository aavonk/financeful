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
    const bankAccounts: Account[] = await this.client.account.findMany({
      where: {
        userId,
      },
      orderBy: {
        accountName: 'asc',
      },
    });

    if (!bankAccounts || !bankAccounts.length) {
      throw new Error('No accounts found');
    }

    const totalAssets = this.calculateAggregateAssets(bankAccounts);

    const assets = bankAccounts
      .filter((account) => account.isAsset)
      .map((acct) => ({
        ...acct,
        percentageOfAssets:
          Number((acct.balance! / totalAssets).toFixed(2)) * 100,
      }));
    const response: AggregateBalanceResponse = {
      assets,
      totalAssets,
      aggregateBalance: this.calculateAggregateTotal(bankAccounts),
      totalLiabilities: this.calculateAggregateLiabilities(bankAccounts),
    };
    return response;
  }
}
