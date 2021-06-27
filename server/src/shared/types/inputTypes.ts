import { InputType, Field, ID, Int } from 'type-graphql';

@InputType()
export class RangeParams {
  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;
}

@InputType()
export class RangeWithAccountID extends RangeParams {
  @Field(() => ID)
  accountId: string;
}

@InputType()
export class MonthAndYear{
  @Field(() => String)
  monthName: string

  @Field(() => Int)
  year: number;
}