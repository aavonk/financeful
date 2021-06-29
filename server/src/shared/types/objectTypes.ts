import { ObjectType, ClassType, Field } from 'type-graphql';

@ObjectType()
export class ErrorMessage {
  @Field(() => String)
  message: string;
}

export function DataOrErrorResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class DataOrErrorResponseClass {
    @Field(() => TItemClass, { nullable: true })
    data?: TItem;

    @Field(() => ErrorMessage, { nullable: true })
    error?: ErrorMessage;
  }

  return DataOrErrorResponseClass;
}

export function DataArrayOrErrorResponse<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class DataArrayOrErrorResponseClass {
    @Field(() => [TItemClass], { nullable: true })
    data?: TItem[];

    @Field(() => ErrorMessage, { nullable: true })
    error?: ErrorMessage;
  }

  return DataArrayOrErrorResponseClass;
}
