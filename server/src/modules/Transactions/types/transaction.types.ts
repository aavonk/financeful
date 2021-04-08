import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class TransactionInput {
  @Field(() => String)
  payee: string;

  @Field(() => Date)
  date: Date;

  @Field(() => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  accountId: string;
}
