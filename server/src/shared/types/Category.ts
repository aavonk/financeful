import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Boolean, { nullable: true })
  excludeFromBudget: boolean;

  @Field(() => Boolean, { nullable: true })
  isHidden: boolean;

  @Field(() => Boolean, { nullable: true })
  isIncome: boolean;
}
