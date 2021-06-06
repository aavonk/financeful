import { InputType, Field } from 'type-graphql';

@InputType()
export class CategoryCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Boolean)
  isIncome: boolean;

  @Field(() => Boolean)
  excludeFromBudget: boolean;
}
