import {
  Resolver,
  Authorized,
  Ctx,
  Arg,
  Query,
  Root,
  FieldResolver,
} from 'type-graphql';
import {
  Context,
  DailyBalance,
  Account,
  RangeParams,
  RangeWithAccountID,
} from '@Shared/types';
import {
  GetBalanceParams,
  AssetsAndLiabilitesResponse,
  HistoryObject,
  InsightDetails,
} from '../types/accountData.types';

@Resolver(() => DailyBalance)
export class AccountDataResolver {
  @Authorized()
  @Query(() => [HistoryObject])
  async getAccountDailyBalances(
    @Arg('input') input: GetBalanceParams,
    @Ctx() { user, accountDataRepo }: Context,
  ): Promise<HistoryObject[]> {
    return await accountDataRepo.getBalances(input, user.id);
  }

  @FieldResolver(() => Account)
  async account(
    @Root() dailyBalance: DailyBalance,
    @Ctx() { accountRepo, user }: Context,
  ): Promise<Account | null> {
    return await accountRepo.getOneAccount(dailyBalance.accountId, user.id);
  }

  @Authorized()
  @Query(() => AssetsAndLiabilitesResponse)
  async getAssetsAndLiabilites(
    @Ctx() { user, aggregateAccountDataRepo }: Context,
  ): Promise<AssetsAndLiabilitesResponse> {
    return await aggregateAccountDataRepo.getAssetsAndLiabilites(user.id);
  }

  @Authorized()
  @Query(() => [HistoryObject])
  async getAggregatedDailyBalances(
    @Arg('input') input: RangeParams,
    @Ctx() { aggregateAccountDataRepo, user }: Context,
  ): Promise<HistoryObject[]> {
    return await aggregateAccountDataRepo.getAggregatedDailyBalances(
      user.id,
      input,
    );
  }

  @Authorized()
  @Query(() => InsightDetails)
  async getAccountInsightDetails(
    @Arg('input') input: RangeWithAccountID,
    @Ctx() { user, transactionRepo, services: { insightService } }: Context,
  ): Promise<InsightDetails> {
    const { startDate, endDate, accountId } = input;
    const transactions = await transactionRepo.getRange(
      { startDate, endDate },
      user.id,
      accountId,
    );

    return insightService.calculateTotalTransactionTypes(transactions);
  }
}
