import { MockedResponse } from '@apollo/client/testing';
import { GetAccountsDocument, Account } from '@Generated/graphql';
import { GraphQLError } from 'graphql';

export const ACCOUNTS: Account[] = [
  {
    __typename: 'Account',
    id: 'sdfg',
    accountName: 'Credit Card',
    accountType: 'CREDIT',
    isAsset: false,
    isLiability: true,
    balance: 0,
    bankName: 'Discover',
    isInactive: false,
  },
  {
    __typename: 'Account',
    id: 'wreqe',
    accountName: 'Primary Checking',
    accountType: 'DEBIT',
    isAsset: true,
    isLiability: false,
    balance: 20,
    bankName: 'Chase',
    isInactive: false,
  },
];

export const getAccountsSuccess: MockedResponse = {
  request: {
    query: GetAccountsDocument,
    variables: {},
  },
  result: {
    data: {
      getAccounts: ACCOUNTS,
    },
  },
};

export const getAccountsError: MockedResponse = {
  request: {
    query: GetAccountsDocument,
    variables: {},
  },
  error: new Error('HA! 😡'),
};

export const getAccountsGQLError: MockedResponse = {
  request: {
    query: GetAccountsDocument,
    variables: {},
  },
  error: new GraphQLError('Gotcha'),
};
