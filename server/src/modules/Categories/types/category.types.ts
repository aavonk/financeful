import { InputType, Field, ObjectType } from 'type-graphql';
import { Category } from '@Shared/types';

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

  @Field(() => Boolean)
  isHidden: boolean;
}

@ObjectType()
export class CategoryCreateError {
  @Field(() => String)
  message: string;
}

@ObjectType()
export class CategoryCreateResult {
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => CategoryCreateError, { nullable: true })
  error?: CategoryCreateError;
}
