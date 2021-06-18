import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class CreateBudgetItemInput {
  @Field(() => ID)
  budgetId: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => Int)
  budgetAmount: number;
}
