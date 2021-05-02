import { Field, ObjectType, ID, Int } from 'type-graphql';
import { Account } from '@Shared/types';

@ObjectType()
export class DailyBalance {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  date: Date | string;

  @Field(() => ID)
  accountId: string;

  @Field(() => Account, { nullable: true })
  account?: Account;
}
