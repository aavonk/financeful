import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ID)
  userId: string;

  @Field(() => String)
  accountName: string;

  @Field(() => String)
  accountType: String;

  @Field(() => Boolean)
  isAsset: boolean;

  @Field(() => Boolean)
  isLiability: Boolean;

  @Field(() => Int, { nullable: true })
  balance?: number;
}
