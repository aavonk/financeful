import { AssetsAndLiabilitesResponse } from '../types/accountData.types';

export interface IAggregateAccountData {
  getAssetsAndLiabilites(userId: string): Promise<AssetsAndLiabilitesResponse>;
}
