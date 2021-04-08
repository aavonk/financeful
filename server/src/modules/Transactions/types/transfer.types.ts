import { ObjectType, Field, ID, InputType, Int } from 'type-graphql';
import { Account, Category } from '@Shared/types';

@ObjectType()
export class Transfer {
  @Field(() => ID)
  id: string;

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

@InputType()
export class TransferInput {
  @Field(() => Date)
  date: Date;

  @Field(() => Int)
  amount: number;

  @Field(() => ID)
  fromAccount: string;

  @Field(() => ID)
  toAccount: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID, { nullable: true })
  categoryId?: string;
}
