import { Field, InputType, ID, ObjectType, Int } from 'type-graphql';
import { Account } from '@Shared/types';

@InputType()
export class GetBalanceParams {
  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => ID)
  accountId: string;
}

@ObjectType()
export class AccountWithPercentOfAssets extends Account {
  @Field(() => Int)
  percentageOfAssets: number;
}

@ObjectType()
export class AggregateBalanceResponse {
  @Field(() => [AccountWithPercentOfAssets])
  assets: AccountWithPercentOfAssets[];

  @Field(() => Int)
  aggregateBalance: number;

  @Field(() => Int)
  totalAssets: number;

  @Field(() => Int)
  totalLiabilities: number;
}
