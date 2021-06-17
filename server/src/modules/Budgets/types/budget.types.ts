import { InputType, Field, Int, ObjectType } from 'type-graphql';
import { DataOrErrorResponse, Budget } from '@Shared/types';

@ObjectType()
export class CreateBudgetResponse extends DataOrErrorResponse(Budget) {}

@InputType()
export class CreateBudgetInput {
  @Field(() => String)
  month: string;

  @Field(() => Int)
  year: number;
}
