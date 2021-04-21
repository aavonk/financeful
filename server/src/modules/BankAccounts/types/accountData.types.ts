import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class GetBalanceParams {
  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => ID)
  accountId: string;
}
