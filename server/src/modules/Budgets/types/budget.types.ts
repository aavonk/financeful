import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateBudgetInput {
  @Field(() => String)
  month: string;

  @Field(() => Int)
  year: number;
}
