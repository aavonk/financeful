import { InputType, Field, Int, registerEnumType } from 'type-graphql';
import { Type } from '../../types/Transaction';

registerEnumType(Type, {
  name: 'Type',
  description: 'Types of transactions',
});

@InputType()
export class TransactionInput {
  @Field(() => String)
  payee: string;

  @Field(() => String)
  date: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => Type)
  type: Type;
}
