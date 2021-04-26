import { Field, InputType, ID, ObjectType, Float } from 'type-graphql';
import { RangeParams } from '@Shared/types';

@InputType()
export class GetBalanceParams extends RangeParams {
  @Field(() => ID)
  accountId: string;
}

@ObjectType()
export class AssetsAndLiabilitiesBarChartData {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  accountName: string;

  @Field(() => Float)
  balance: number;

  @Field(() => Boolean)
  isAsset: boolean;

  @Field(() => Boolean)
  isLiability: boolean;
}

@ObjectType()
export class AssetsAndLiabilitesResponse {
  @Field(() => [AssetsAndLiabilitiesBarChartData])
  accounts: AssetsAndLiabilitiesBarChartData[];

  @Field(() => Float)
  aggregateBalance: number;
}
