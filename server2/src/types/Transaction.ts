import { Field, ObjectType, ID, Int, registerEnumType } from 'type-graphql';
import { User } from './User';

export enum Type {
  INCOME = 'INCOME',
  EXPENSE = 'ESPENSE',
  TRANSFER = 'TRANSFER',
}

registerEnumType(Type, {
  name: 'Type',
  description: 'Types of transactions',
});

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  payee: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => Type)
  type: Type;

  @Field(() => Date)
  date: Date;
}
