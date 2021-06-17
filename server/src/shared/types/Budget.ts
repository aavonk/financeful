import { Field, ObjectType, ID, Int } from 'type-graphql';
import { BudgetItem } from '@Shared/types';

@ObjectType()
export class Budget {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  month: string;

  @Field(() => Int)
  year: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => [BudgetItem], { nullable: true })
  items: BudgetItem[] | [];
}
