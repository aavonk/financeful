import {
  AssetsAndLiabilitesResponse,
  HistoryObject,
} from '../types/accountData.types';
import { RangeParams } from '@Shared/types';

export interface IAggregateAccountData {
  getAssetsAndLiabilites(userId: string): Promise<AssetsAndLiabilitesResponse>;
  getAggregatedDailyBalances(
    userId: string,
    range: RangeParams,
  ): Promise<HistoryObject[]>;
}
