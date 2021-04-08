import { ObjectType, Field } from 'type-graphql';
import { Account } from '../../../types/Account';
import { Category } from '../../../types/Category';

@ObjectType()
export class Transfer {
  @Field(() => Date)
  date: Date;

  @Field(() => Account)
  fromAccount: Account;

  @Field(() => Account)
  toAccount: Account;

  @Field(() => Category, { nullable: true })
  category?: Category | null;

  @Field(() => String, { nullable: true })
  description?: string | null;
}
