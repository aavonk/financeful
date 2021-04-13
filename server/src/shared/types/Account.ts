import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  accountName?: string;

  @Field(() => String, { nullable: true })
  accountType?: String;

  @Field(() => Boolean, { nullable: true })
  isAsset?: boolean;

  @Field(() => Boolean, { nullable: true })
  isLiability?: Boolean;

  @Field(() => Int, { nullable: true })
  startingBalance?: number;

  @Field(() => String, { nullable: true })
  bankName?: string | null;
}
