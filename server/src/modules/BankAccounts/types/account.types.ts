import { Field, InputType, Int, registerEnumType } from 'type-graphql';

enum AccountClassification {
  asset = 'ASSET',
  liability = 'LIABILITY',
}

registerEnumType(AccountClassification, {
  name: 'AccountType', // this one is mandatory
  description: 'Asset or liability', // this one is optional
});

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  accountName: string;

  @Field(() => String)
  accountType: string;

  @Field(() => Int)
  balance: number;

  @Field(() => String, { nullable: true })
  bankName?: string;

  @Field(() => AccountClassification)
  classification: AccountClassification;
}

@InputType()
export class EditAccountInput {
  @Field(() => String)
  accountName: string;

  @Field(() => String)
  accountType: string;

  @Field(() => String, { nullable: true })
  bankName?: string;

  @Field(() => AccountClassification)
  classification: AccountClassification;
}

@InputType()
export class AccountQueryFilters {
  @Field(() => Boolean)
  isInactive: boolean;
}
