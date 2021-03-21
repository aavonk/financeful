import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';
import { Account } from './Account';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Int)
  userId: string;

  @Field(() => String)
  payee: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  category?: string | null;

  @Field(() => String)
  type: string;

  @Field(() => Date)
  date: Date;

  @Field(() => ID)
  accountId: string;

  @Field(() => Account, { nullable: true })
  account?: Account;
}
