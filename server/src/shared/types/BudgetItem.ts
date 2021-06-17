import { ObjectType, ID, Int, Field } from 'type-graphql';
import { Category, Budget } from '@Shared/types';

@ObjectType()
export class BudgetItem {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  amount: number;

  @Field(() => Int)
  budgetAmount: number;

  @Field(() => Boolean)
  isExpense: boolean;

  @Field(() => Boolean)
  isIncome: boolean;

  @Field(() => Boolean)
  isTransfer: boolean;

  @Field(() => ID)
  categoryId: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => ID)
  budgetId: string;

  @Field(() => Budget, { nullable: true })
  budget?: Budget;
}
