/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MockedResponse } from '@apollo/client/testing';
import {
  FetchAccountsAndCategoriesDocument,
  UpdateTransactionDocument,
  UpdateTransferDocument,
  GetTransferDocument,
  Transaction,
  TransactionInput,
  Transfer,
  TransferInput,
} from '@Generated/graphql';

export const ACCOUNTS = [
  {
    id: 'asd123sdvf',
    accountName: 'Primary Savings',
  },
  {
    id: 'asdd123sdfee',
    accountName: 'Credit Card',
  },
  {
    id: 'asdf234gfd',
    accountName: 'Primary Checking',
  },
];

export const CATEGORIES = [
  {
    id: 'hjk789hjk',
    name: 'Groceries',
  },
  {
    id: 'hjk678hjko',
    name: 'Drinks & Snacks',
  },
  {
    id: 'jkl789jkl55',
    name: 'Rent',
  },
];

export const transactionMock: Transaction = {
  id: 'as12',
  userId: '123asd3',
  payee: 'Test',
  description: 'Test',
  amount: 1000,
  category: {
    id: CATEGORIES[0].id,
    name: CATEGORIES[0].name,
  },
  type: 'EXPENSE',
  date: new Date('2021-03-31T21:10:49.950Z'),
  accountId: ACCOUNTS[0].id,
  account: {
    accountName: ACCOUNTS[0].accountName,
    id: ACCOUNTS[0].id,
  },
  isCashIn: false,
  isCashOut: true,
  isUncategorized: false,
  isTransfer: false,
  transferId: null,
};

export const transferMock: Transaction = {
  ...transactionMock,
  isTransfer: true,
  type: 'TRANSFER',
  transferId: 'abc123',
  payee: 'Transfer to savings',
};

export const getTransferResponse: Transfer = {
  date: transferMock.date,
  amount: transferMock.amount,
  fromAccount: ACCOUNTS[0],
  toAccount: ACCOUNTS[1],
  category: {
    name: CATEGORIES[0].name,
    id: CATEGORIES[0].id,
  },
  description: 'Hi there',
  id: transferMock.transferId!,
};

const transactionUpdates: TransactionInput = {
  payee: transactionMock.payee,
  accountId: transactionMock.accountId!,
  amount: transactionMock.amount,
  date: transactionMock.date,
  type: transactionMock.type,
  categoryId: transactionMock.category!.id,
  description: transactionMock.description,
};

const transferUpdates: TransferInput = {
  amount: transferMock.amount,
  date: transferMock.date,
  fromAccount: ACCOUNTS[0].id,
  toAccount: ACCOUNTS[1].id,
  categoryId: CATEGORIES[0].id,
  description: transferMock.description,
};

const transferUpdateResponse: Transaction[] = [
  {
    // This is the transaction with money leaving -- the fromAccount
    id: 'as12',
    userId: '123asd3',
    payee: 'Test',
    description: transferMock.description,
    amount: transferMock.amount * -1,
    category: {
      id: CATEGORIES[0].id,
      name: CATEGORIES[0].name,
    },
    type: transferMock.type,
    date: transferMock.date,
    accountId: ACCOUNTS[0].id,
    account: {
      accountName: ACCOUNTS[0].accountName,
      id: ACCOUNTS[0].id,
    },
    isCashIn: false,
    isCashOut: true,
    isUncategorized: false,
    isTransfer: true,
    transferId: transferMock.transferId,
  },
  {
    // This is the transaction with money entering -- the toAccount
    id: 'as12',
    userId: '123asd3',
    payee: 'Test',
    description: transferMock.description,
    amount: transferMock.amount,
    category: {
      id: CATEGORIES[0].id,
      name: CATEGORIES[0].name,
    },
    type: transferMock.type,
    date: transferMock.date,
    accountId: ACCOUNTS[1].id,
    account: {
      accountName: ACCOUNTS[1].accountName,
      id: ACCOUNTS[1].id,
    },
    isCashIn: true,
    isCashOut: false,
    isUncategorized: false,
    isTransfer: true,
    transferId: transferMock.transferId,
  },
];

export const fetchAccountsAndCategoriesSuccess: MockedResponse = {
  request: {
    query: FetchAccountsAndCategoriesDocument,
  },
  result: {
    data: {
      getAccounts: ACCOUNTS,
      getCategories: CATEGORIES,
    },
  },
};

export const fetchAccountsAndCategoriesError: MockedResponse = {
  request: {
    query: FetchAccountsAndCategoriesDocument,
  },
  error: new Error('A scary error 🥵'),
};

export const updateTransactionSuccess: MockedResponse = {
  request: {
    query: UpdateTransactionDocument,
    variables: { input: transactionUpdates, id: transactionMock.id },
  },
  result: {
    data: {
      updateTransaction: transactionMock,
    },
  },
};

export const updateTransactionError: MockedResponse = {
  request: {
    query: UpdateTransactionDocument,
    variables: { input: transactionUpdates, id: transactionMock.id },
  },
  error: new Error('A scary error 🥵'),
};

export const updateTransferSuccess: MockedResponse = {
  request: {
    query: UpdateTransferDocument,
    variables: { input: transferUpdates, transferId: transferMock.transferId },
  },
  result: {
    data: {
      updateTransfer: transferUpdateResponse,
    },
  },
};

export const updateTransferError: MockedResponse = {
  request: {
    query: UpdateTransferDocument,
    variables: { input: transferUpdates, transferId: transferMock.transferId },
  },
  error: new Error('Yikes'),
};

export const fetchTransferSuccess: MockedResponse = {
  request: {
    query: GetTransferDocument,
    variables: { id: transferMock.transferId },
  },
  result: {
    data: {
      getTransfer: getTransferResponse,
    },
  },
};

export const fetchTransferError: MockedResponse = {
  request: {
    query: GetTransferDocument,
    variables: { id: transferMock.transferId },
  },
  error: new Error('Error!! 🙈'),
};
