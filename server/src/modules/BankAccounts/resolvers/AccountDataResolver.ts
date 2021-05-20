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
  TransactionTypes,
} from '@Shared/types';
import {
  GetBalanceParams,
  AssetsAndLiabilitesResponse,
  HistoryObject,
  InsightDetailsResponse,
  InsightPieChartData,
} from '../types/accountData.types';

import { DateUtils } from '@Shared/utils/DateUtils';

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
  @Query(() => InsightDetailsResponse, {
    description:
      'Returns the total Income, expense, and transfers for the specified account in the current month, as well with a formatted description',
  })
  async getAccountInsights(
    @Arg('accountId') accountId: string,
    @Ctx() { user, services: { insightService, transactionService } }: Context,
  ): Promise<InsightDetailsResponse> {
    const today = new Date();
    const { startDate, endDate } = DateUtils.getMonthStartAndEnd(today);
    const previousMonth = DateUtils.getPreviousMonthStartAndEnd(today);

    const currentMonthTransactions = await transactionService.getRange(
      { startDate, endDate },
      user.id,
      accountId,
    );

    const previousMonthTransactions = await transactionService.getRange(
      { startDate: previousMonth.startDate, endDate: previousMonth.endDate },
      user.id,
      accountId,
    );

    const currentMonthDetails = insightService.calculateTotalTransactionTypes(
      currentMonthTransactions,
    );

    const previousMonthDetails = insightService.calculateTotalTransactionTypes(
      previousMonthTransactions,
    );

    const data: InsightPieChartData[] = [
      { name: TransactionTypes.INCOME, value: currentMonthDetails.income },
      { name: TransactionTypes.EXPENSES, value: currentMonthDetails.expenses },
      {
        name: TransactionTypes.TRANSFERS,
        value: currentMonthDetails.transfers,
      },
    ];

    return {
      data: data,
      message: insightService.formatInsightMessage(
        currentMonthDetails,
        previousMonthDetails,
      ),
    };
  }
}
