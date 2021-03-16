import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Int)
  userId: number;

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
}