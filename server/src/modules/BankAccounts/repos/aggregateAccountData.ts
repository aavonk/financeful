import {
  AssetsAndLiabilitesResponse,
  GetBalanceHistoriesResponse,
} from '../types/accountData.types';
import { RangeParams } from '@Shared/types';

export interface IAggregateAccountData {
  getAssetsAndLiabilites(userId: string): Promise<AssetsAndLiabilitesResponse>;
  getBalanceHistories(
    userId: string,
    range: RangeParams,
  ): Promise<GetBalanceHistoriesResponse>;
}
