import { InputType, Field } from 'type-graphql';

@InputType()
export class RangeParams {
  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;
}
