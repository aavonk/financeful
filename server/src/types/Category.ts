import { Field, ObjectType, ID, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Int)
  userId: number;

  @Field(() => String)
  name: string;
}
