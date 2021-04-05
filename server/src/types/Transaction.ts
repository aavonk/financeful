import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';
import { Account } from './Account';
import { Category } from './Category';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  payee: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  amount: number;

  @Field(() => Category, { nullable: true })
  category?: Category | null;

  @Field(() => String)
  type: string;

  @Field(() => Date)
  date: Date;

  @Field(() => ID, { nullable: true })
  accountId?: string;

  @Field(() => Account, { nullable: true })
  account?: Account;

  @Field(() => Boolean, { nullable: true })
  isCashIn?: boolean;

  @Field(() => Boolean, { nullable: true })
  isCashOut?: boolean;

  @Field(() => Boolean, { nullable: true })
  isUncategorized?: boolean;

  @Field(() => Boolean, { nullable: true })
  isTransfer?: boolean;

  @Field(() => String, { nullable: true })
  transferId?: string | null;
}
