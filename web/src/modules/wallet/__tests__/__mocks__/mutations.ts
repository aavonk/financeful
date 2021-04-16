import { MockedResponse } from '@apollo/client/testing';
import {
  CreateAccountDocument,
  CreateAccountInput,
  AccountType,
  Account,
} from '@Generated/graphql';

export const newAccountInput: CreateAccountInput = {
  accountName: 'My New Account',
  accountType: 'Primary Checking',
  balance: 1000,
  bankName: 'Chase',
  classification: 'asset' as AccountType,
};

const { classification, ...responseData } = newAccountInput;

export const newAccountResponse: Account = {
  __typename: 'Account',
  id: 'abcdefg',
  ...responseData,
  isAsset: true,
  isLiability: false,
};

export const createAccountMutation: MockedResponse = {
  request: {
    query: CreateAccountDocument,
    variables: {
      input: newAccountInput,
    },
  },
  result: {
    data: {
      createAccount: newAccountResponse,
    },
  },
};
