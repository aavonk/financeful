import { InputType, Field, Int, ObjectType, ID } from 'type-graphql';
import { DataOrErrorResponse, Budget } from '@Shared/types';

@ObjectType()
export class CreateBudgetResponse extends DataOrErrorResponse(Budget) {}

@InputType()
export class CreateBudgetInput {
  @Field(() => String)
  month: string;

  @Field(() => Int)
  year: number;

  @Field(() => [CreateBudgetItemInput])
  items: CreateBudgetItemInput[];
}

@InputType()
export class CreateBudgetItemInput {
  @Field(() => ID)
  categoryId: string;

  @Field(() => Int)
  budgetAmount: number;

  @Field(() => Boolean)
  isIncome: boolean;

  @Field(() => Boolean)
  isExpense: boolean;
}
