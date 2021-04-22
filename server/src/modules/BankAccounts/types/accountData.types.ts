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
export class AggregateBalanceResponse {
  @Field(() => [Account])
  accounts: Account[];

  @Field(() => Int)
  aggregateBalance: number;

  @Field(() => Int)
  totalAssets: number;

  @Field(() => Int)
  totalLiabilities: number;
}
