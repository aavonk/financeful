import { Field, InputType, ID, ObjectType, Float, Int } from 'type-graphql';
import { RangeParams } from '@Shared/types';

@InputType()
export class GetBalanceParams extends RangeParams {
  @Field(() => ID)
  accountId: string;
}

@ObjectType()
export class AmountFloat {
  @Field(() => Float)
  amount: number;
}

@ObjectType()
export class LiabilityDetails extends AmountFloat {
  @Field(() => Int)
  percentOfAssets: number;
}

@ObjectType()
export class FormattedAccountBalance {
  @Field(() => String)
  accountName: string;

  @Field(() => Float, { description: 'The balance formatted as a float' })
  balance: number;
}

@ObjectType()
export class AssetsAndLiabilitesResponse {
  @Field(() => Float, {
    description: 'The combined balance of all accounts formatted as a float',
  })
  aggregateBalance: number;

  @Field(() => AmountFloat)
  assets: AmountFloat;

  @Field(() => LiabilityDetails)
  liabilites: LiabilityDetails;
}

@ObjectType()
export class HistoryObject {
  @Field(() => String, { description: 'Date formated in mm/dd/yyyy format' })
  date: string;

  @Field(() => Float, {
    description: 'The aggregated balance formatted in $120.00',
  })
  balance: number;
}

@ObjectType({
  description: 'The total Income, expense, and transfers for the current month',
})
export class InsightDetails {
  @Field(() => Float, { description: 'The total income for the current month' })
  income: number;

  @Field(() => Float, {
    description: 'The total expenses for the current month',
  })
  expenses: number;

  @Field(() => Float, {
    description: 'The total transfers for the current month',
  })
  transfers: number;
}

@ObjectType()
export class InsightDetailsResponse extends InsightDetails {
  @Field(() => String, {
    description:
      'A formatted message comparing the current month with previous',
  })
  message: string;
}
