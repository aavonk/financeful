import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  displayName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirmation: string;
}
