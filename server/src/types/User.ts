import { Field, ObjectType, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  displayName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  avatar?: string | null;

  //Need to add Transaction field?

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String, { nullable: true })
  token?: string | null;
}
