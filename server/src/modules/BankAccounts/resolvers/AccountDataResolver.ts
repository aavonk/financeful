import {
  Resolver,
  Authorized,
  Ctx,
  Arg,
  Query,
  Root,
  FieldResolver,
} from 'type-graphql';
import { Context, DailyBalance, Account } from '@Shared/types';
import {
  GetBalanceParams,
  AggregateBalanceResponse,
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
  @Query(() => AggregateBalanceResponse)
  async getAggregatedBalances(
    @Ctx() { aggregateAccountDataRepo, user }: Context,
  ): Promise<AggregateBalanceResponse> {
    return await aggregateAccountDataRepo.getCurrentBalances(user.id);
  }
}
