/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MockedResponse } from '@apollo/client/testing';
import {
  CreateAccountDocument,
  CreateAccountInput,
  EditAccountDocument,
  EditAccountInput,
  AccountType,
  Account,
} from '@Generated/graphql';
import { ACCOUNTS } from './queries';

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

const firstAccount = ACCOUNTS[0];

export const editAccountVariables: EditAccountInput = {
  accountName: 'Test Account',
  bankName: 'Test Bank',
  accountType: firstAccount.accountType!,
  classification: (firstAccount.isAsset ? 'asset' : 'liability') as AccountType,
};

const editAccountResponse: Account = {
  ...firstAccount,
  accountName: editAccountVariables.accountName,
  bankName: editAccountVariables.bankName,
  accountType: editAccountVariables.accountType,
  isAsset: true,
  isLiability: false,
};

export const editAccountSuccess: MockedResponse = {
  request: {
    query: EditAccountDocument,
    variables: { input: editAccountVariables, accountId: firstAccount.id },
  },
  result: {
    data: {
      editAccount: editAccountResponse,
    },
  },
};
