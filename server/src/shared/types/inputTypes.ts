import { InputType, Field, ID } from 'type-graphql';

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
