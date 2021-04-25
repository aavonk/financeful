import { AssetsAndLiabilitesResponse } from '@Modules/BankAccounts/types/accountData.types';
import { IDataBase, Account } from '@Shared/types';
import { IAggregateAccountData } from '../aggregateAccountData';
import { MoneyUtils } from '@Shared/utils/moneyUtils';
export class AggregateAccountData implements IAggregateAccountData {
  private readonly client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  private calculateAggregateTotal(accounts: Account[]): number {
    return accounts.reduce((total, obj) => obj.balance! + total, 0);
  }

  public async getAssetsAndLiabilites(
    userId: string,
  ): Promise<AssetsAndLiabilitesResponse> {
    const bankAccounts = await this.client.account.findMany({
      where: {
        userId,
      },
      orderBy: {
        accountName: 'asc',
      },
      select: {
        accountName: true,
        balance: true,
        isAsset: true,
        isLiability: true,
        id: true,
      },
    });

    const data = bankAccounts.map((account) => ({
      ...account,
      balance: MoneyUtils.convertToFloat(account.balance),
    }));

    return {
      accounts: data,
      aggregateBalance: MoneyUtils.convertToFloat(
        this.calculateAggregateTotal(bankAccounts),
      ),
    };
  }
}
