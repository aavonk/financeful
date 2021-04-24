import { AssetsAndLiabilitesResponse } from '@Modules/BankAccounts/types/accountData.types';
import { IDataBase } from '@Shared/types';
import { IAggregateAccountData } from '../aggregateAccountData';

export class AggregateAccountData implements IAggregateAccountData {
  private readonly client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
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
      balance: Number((account.balance / 100).toFixed(2)),
    }));

    return { data };
  }
}
