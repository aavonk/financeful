import { Field, InputType, ID, ObjectType, Float } from 'type-graphql';
import { RangeParams } from '@Shared/types';

@InputType()
export class GetBalanceParams extends RangeParams {
  @Field(() => ID)
  accountId: string;
}

@ObjectType()
export class FormattedAccountBalance {
  @Field(() => String)
  accountName: string;

  @Field(() => Float, { description: 'The balance formatted as a float' })
  balance: number;
}

@ObjectType()
export class AssetsAndLiabilitiesBarChartData extends FormattedAccountBalance {
  @Field(() => ID, { description: 'The ID of the account' })
  id: string;

  @Field(() => Boolean)
  isAsset: boolean;

  @Field(() => Boolean)
  isLiability: boolean;
}

@ObjectType()
export class AssetsAndLiabilitesResponse {
  @Field(() => [AssetsAndLiabilitiesBarChartData])
  accounts: AssetsAndLiabilitiesBarChartData[];

  @Field(() => Float, {
    description: 'The combined balance of all accounts formatted as a float',
  })
  aggregateBalance: number;
}

@ObjectType()
export class HistoryObject extends FormattedAccountBalance {
  @Field(() => String, { description: 'Date formated in mm/dd/yyyy format' })
  date: string;

  @Field(() => ID, { description: 'The ID of the balance object' })
  balanceId: string;

  @Field(() => ID, { description: 'The ID of the account' })
  accountId: string;
}

@ObjectType()
export class GetBalanceHistoriesResponse {
  @Field(() => [ID], { description: 'An array containing each account ID' })
  accountIds: string[];

  @Field(() => [HistoryObject])
  histories: HistoryObject[];
}
