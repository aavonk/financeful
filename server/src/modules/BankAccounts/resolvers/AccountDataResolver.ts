import {
  Resolver,
  Authorized,
  Ctx,
  Arg,
  Query,
  Root,
  FieldResolver,
} from 'type-graphql';
import { Context, DailyBalance, Account, RangeParams } from '@Shared/types';
import {
  GetBalanceParams,
  AssetsAndLiabilitesResponse,
  GetBalanceHistoriesResponse,
} from '../types/accountData.types';

@Resolver(() => DailyBalance)
export class AccountDataResolver {
  @Authorized()
  @Query(() => [DailyBalance])
  async getAccountDailyBalances(
    @Arg('input') input: GetBalanceParams,
    @Ctx() { user, accountDataRepo }: Context,
  ): Promise<DailyBalance[]> {
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
  @Query(() => GetBalanceHistoriesResponse)
  async getBalanceHistories(
    @Arg('input') input: RangeParams,
    @Ctx() { aggregateAccountDataRepo, user }: Context,
  ): Promise<GetBalanceHistoriesResponse> {
    return await aggregateAccountDataRepo.getBalanceHistories(user.id, input);
  }
}
