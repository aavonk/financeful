import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser: User;
  getTransactions?: Maybe<Array<Transaction>>;
  getTransaction?: Maybe<Transaction>;
  getTransactionsRange: Array<Transaction>;
  getTransfer: Transfer;
  getAccounts: Array<Account>;
  getCategories: Array<Category>;
  getAccountDailyBalances: Array<HistoryObject>;
  getAssetsAndLiabilites: AssetsAndLiabilitesResponse;
  getAggregatedDailyBalances: Array<HistoryObject>;
  /** Returns the total Income, expense, and transfers for the specified account in the current month, as well with a formatted description */
  getAccountInsights: InsightDetailsResponse;
};


export type QueryGetTransactionArgs = {
  id: Scalars['String'];
};


export type QueryGetTransactionsRangeArgs = {
  accountId?: Maybe<Scalars['String']>;
  input: RangeParams;
};


export type QueryGetTransferArgs = {
  id: Scalars['String'];
};


export type QueryGetAccountsArgs = {
  filter?: Maybe<AccountQueryFilters>;
};


export type QueryGetAccountDailyBalancesArgs = {
  input: GetBalanceParams;
};


export type QueryGetAggregatedDailyBalancesArgs = {
  input: RangeParams;
};


export type QueryGetAccountInsightsArgs = {
  accountId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  token?: Maybe<Scalars['String']>;
};


export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  user?: Maybe<User>;
  userId: Scalars['String'];
  payee: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
  category?: Maybe<Category>;
  type: Scalars['String'];
  date: Scalars['DateTime'];
  accountId?: Maybe<Scalars['ID']>;
  account?: Maybe<Account>;
  isCashIn?: Maybe<Scalars['Boolean']>;
  isCashOut?: Maybe<Scalars['Boolean']>;
  isUncategorized?: Maybe<Scalars['Boolean']>;
  isTransfer?: Maybe<Scalars['Boolean']>;
  transferId?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
  accountName?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['Int']>;
  bankName?: Maybe<Scalars['String']>;
  isAsset?: Maybe<Scalars['Boolean']>;
  isLiability?: Maybe<Scalars['Boolean']>;
  isInactive?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type RangeParams = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};

export type Transfer = {
  __typename?: 'Transfer';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  fromAccount: Account;
  toAccount: Account;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  amount: Scalars['Int'];
};

export type AccountQueryFilters = {
  isInactive: Scalars['Boolean'];
};

export type HistoryObject = {
  __typename?: 'HistoryObject';
  /** Date formated in mm/dd/yyyy format */
  date: Scalars['String'];
  /** The aggregated balance formatted in $120.00 */
  balance: Scalars['Float'];
};

export type GetBalanceParams = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  accountId: Scalars['ID'];
};

export type AssetsAndLiabilitesResponse = {
  __typename?: 'AssetsAndLiabilitesResponse';
  /** The combined balance of all accounts formatted as a float */
  aggregateBalance: Scalars['Float'];
  assets: AmountFloat;
  liabilites: LiabilityDetails;
};

export type AmountFloat = {
  __typename?: 'AmountFloat';
  amount: Scalars['Float'];
};

export type LiabilityDetails = {
  __typename?: 'LiabilityDetails';
  amount: Scalars['Float'];
  percentOfAssets: Scalars['Int'];
};

export type InsightDetailsResponse = {
  __typename?: 'InsightDetailsResponse';
  data: Array<InsightPieChartData>;
  /** A formatted message comparing the current month with previous */
  message: Scalars['String'];
};

export type InsightPieChartData = {
  __typename?: 'InsightPieChartData';
  name: TransactionTypes;
  value: Scalars['Float'];
};

/** Income, Expenses, or Transfers */
export enum TransactionTypes {
  Income = 'INCOME',
  Expenses = 'EXPENSES',
  Transfers = 'TRANSFERS'
}

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  register: User;
  createTransaction: Transaction;
  deleteTransaction: Scalars['String'];
  updateTransaction: Transaction;
  createTransfer: TransferResult;
  updateTransfer: TransferResult;
  deleteTransfer: Scalars['String'];
  createAccount: Account;
  editAccount: Account;
  toggleAccountActiveStatus: Account;
  deleteAccount: Scalars['ID'];
  createCategory: Category;
  updateCategory: Category;
  deleteCategory: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationCreateTransactionArgs = {
  input: TransactionInput;
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTransactionArgs = {
  input: TransactionInput;
  id: Scalars['String'];
};


export type MutationCreateTransferArgs = {
  input: TransferInput;
};


export type MutationUpdateTransferArgs = {
  input: TransferInput;
  transferId: Scalars['String'];
};


export type MutationDeleteTransferArgs = {
  transferId: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationEditAccountArgs = {
  accountId: Scalars['String'];
  input: EditAccountInput;
};


export type MutationToggleAccountActiveStatusArgs = {
  accountId: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String'];
};

export type RegisterInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type TransactionInput = {
  payee: Scalars['String'];
  date: Scalars['DateTime'];
  amount: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  accountId: Scalars['String'];
};

export type TransferResult = {
  __typename?: 'TransferResult';
  transactions?: Maybe<Array<Transaction>>;
  error?: Maybe<TransferError>;
};

export type TransferError = {
  __typename?: 'TransferError';
  message: Scalars['String'];
};

export type TransferInput = {
  date: Scalars['DateTime'];
  amount: Scalars['Int'];
  fromAccount: Scalars['ID'];
  toAccount: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['ID']>;
};

export type CreateAccountInput = {
  accountName: Scalars['String'];
  accountType: Scalars['String'];
  balance: Scalars['Int'];
  bankName?: Maybe<Scalars['String']>;
  classification: AccountType;
};

/** Asset or liability */
export enum AccountType {
  Asset = 'asset',
  Liability = 'liability'
}

export type EditAccountInput = {
  accountName: Scalars['String'];
  accountType: Scalars['String'];
  bankName?: Maybe<Scalars['String']>;
  classification: AccountType;
};

export type GetAccountInsightsQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type GetAccountInsightsQuery = (
  { __typename?: 'Query' }
  & { getAccountInsights: (
    { __typename?: 'InsightDetailsResponse' }
    & Pick<InsightDetailsResponse, 'message'>
    & { data: Array<(
      { __typename?: 'InsightPieChartData' }
      & Pick<InsightPieChartData, 'name' | 'value'>
    )> }
  ) }
);

export type GetDailyBalancesQueryVariables = Exact<{
  input: GetBalanceParams;
}>;


export type GetDailyBalancesQuery = (
  { __typename?: 'Query' }
  & { getAccountDailyBalances: Array<(
    { __typename?: 'HistoryObject' }
    & Pick<HistoryObject, 'date' | 'balance'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'displayName' | 'firstName' | 'token' | 'avatar' | 'email' | 'createdAt'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'displayName' | 'firstName' | 'token' | 'avatar' | 'createdAt'>
  ) }
);

export type FetchUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'displayName' | 'email' | 'avatar' | 'createdAt'>
  ) }
);

export type TransactionFieldsFragment = (
  { __typename?: 'Transaction' }
  & Pick<Transaction, 'id' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'accountId'>
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )>, account?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'accountName' | 'id'>
  )> }
);

export type AddTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type AddTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'userId' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'isCashIn' | 'isCashOut' | 'isUncategorized'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )>, account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'accountName'>
    )> }
  ) }
);

export type CreateTransferMutationVariables = Exact<{
  input: TransferInput;
}>;


export type CreateTransferMutation = (
  { __typename?: 'Mutation' }
  & { createTransfer: (
    { __typename?: 'TransferResult' }
    & { transactions?: Maybe<Array<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'accountId' | 'isCashIn' | 'isCashOut' | 'isUncategorized' | 'isTransfer' | 'transferId'>
      & { category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'name'>
      )>, account?: Maybe<(
        { __typename?: 'Account' }
        & Pick<Account, 'id' | 'accountName'>
      )> }
    )>>, error?: Maybe<(
      { __typename?: 'TransferError' }
      & Pick<TransferError, 'message'>
    )> }
  ) }
);

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTransactionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTransaction'>
);

export type DeleteTransferMutationVariables = Exact<{
  transferId: Scalars['String'];
}>;


export type DeleteTransferMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTransfer'>
);

export type UpdateTransactionMutationVariables = Exact<{
  input: TransactionInput;
  id: Scalars['String'];
}>;


export type UpdateTransactionMutation = (
  { __typename?: 'Mutation' }
  & { updateTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'userId' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'isCashIn' | 'isCashOut' | 'isUncategorized'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )>, account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id' | 'accountName'>
    )> }
  ) }
);

export type UpdateTransferMutationVariables = Exact<{
  input: TransferInput;
  transferId: Scalars['String'];
}>;


export type UpdateTransferMutation = (
  { __typename?: 'Mutation' }
  & { updateTransfer: (
    { __typename?: 'TransferResult' }
    & { transactions?: Maybe<Array<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'accountId' | 'isCashIn' | 'isCashOut' | 'isUncategorized' | 'isTransfer' | 'transferId'>
      & { category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'name'>
      )>, account?: Maybe<(
        { __typename?: 'Account' }
        & Pick<Account, 'id' | 'accountName'>
      )> }
    )>>, error?: Maybe<(
      { __typename?: 'TransferError' }
      & Pick<TransferError, 'message'>
    )> }
  ) }
);

export type FetchAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAccountsQuery = (
  { __typename?: 'Query' }
  & { getAccounts: Array<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName'>
  )> }
);

export type FetchAccountsAndCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAccountsAndCategoriesQuery = (
  { __typename?: 'Query' }
  & { getAccounts: Array<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName'>
  )>, getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )> }
);

export type FetchCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )> }
);

export type GetTransactionsRangeQueryVariables = Exact<{
  input: RangeParams;
  accountId?: Maybe<Scalars['String']>;
}>;


export type GetTransactionsRangeQuery = (
  { __typename?: 'Query' }
  & { getTransactionsRange: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'isCashIn' | 'isCashOut' | 'isUncategorized' | 'isTransfer' | 'transferId'>
    & TransactionFieldsFragment
  )> }
);

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { getTransactions?: Maybe<Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'accountId' | 'isCashIn' | 'isCashOut' | 'isUncategorized' | 'isTransfer' | 'transferId'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )>, account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'accountName' | 'id'>
    )> }
  )>> }
);

export type GetTransferQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTransferQuery = (
  { __typename?: 'Query' }
  & { getTransfer: (
    { __typename?: 'Transfer' }
    & Pick<Transfer, 'id' | 'date' | 'amount' | 'description'>
    & { fromAccount: (
      { __typename?: 'Account' }
      & Pick<Account, 'accountName' | 'id'>
    ), toAccount: (
      { __typename?: 'Account' }
      & Pick<Account, 'accountName' | 'id'>
    ), category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name' | 'id'>
    )> }
  ) }
);

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'Mutation' }
  & { createAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'balance' | 'bankName' | 'accountName' | 'accountType' | 'isAsset' | 'isLiability'>
  ) }
);

export type DeleteAccountMutationVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type EditAccountMutationVariables = Exact<{
  accountId: Scalars['String'];
  input: EditAccountInput;
}>;


export type EditAccountMutation = (
  { __typename?: 'Mutation' }
  & { editAccount: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName' | 'accountType' | 'isAsset' | 'isLiability' | 'balance' | 'bankName'>
  ) }
);

export type ToggleAccountActiveStatusMutationVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type ToggleAccountActiveStatusMutation = (
  { __typename?: 'Mutation' }
  & { toggleAccountActiveStatus: (
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName' | 'accountType' | 'isAsset' | 'isLiability' | 'balance' | 'isInactive'>
  ) }
);

export type GetAccountsQueryVariables = Exact<{
  filter?: Maybe<AccountQueryFilters>;
}>;


export type GetAccountsQuery = (
  { __typename?: 'Query' }
  & { getAccounts: Array<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'accountName' | 'accountType' | 'isAsset' | 'isLiability' | 'isInactive' | 'balance' | 'bankName' | 'updatedAt'>
  )> }
);

export type GetAssetsAndLiabilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssetsAndLiabilitiesQuery = (
  { __typename?: 'Query' }
  & { getAssetsAndLiabilites: (
    { __typename?: 'AssetsAndLiabilitesResponse' }
    & Pick<AssetsAndLiabilitesResponse, 'aggregateBalance'>
    & { assets: (
      { __typename?: 'AmountFloat' }
      & Pick<AmountFloat, 'amount'>
    ), liabilites: (
      { __typename?: 'LiabilityDetails' }
      & Pick<LiabilityDetails, 'amount' | 'percentOfAssets'>
    ) }
  ) }
);

export type GetBalanceHistoriesQueryVariables = Exact<{
  input: RangeParams;
}>;


export type GetBalanceHistoriesQuery = (
  { __typename?: 'Query' }
  & { getAggregatedDailyBalances: Array<(
    { __typename?: 'HistoryObject' }
    & Pick<HistoryObject, 'date' | 'balance'>
  )> }
);

export const TransactionFieldsFragmentDoc = gql`
    fragment TransactionFields on Transaction {
  id
  payee
  description
  amount
  category {
    id
    name
  }
  type
  date
  accountId
  account {
    accountName
    id
  }
}
    `;
export const GetAccountInsightsDocument = gql`
    query GetAccountInsights($accountId: String!) {
  getAccountInsights(accountId: $accountId) {
    message
    data {
      name
      value
    }
  }
}
    `;

/**
 * __useGetAccountInsightsQuery__
 *
 * To run a query within a React component, call `useGetAccountInsightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountInsightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountInsightsQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetAccountInsightsQuery(baseOptions: Apollo.QueryHookOptions<GetAccountInsightsQuery, GetAccountInsightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountInsightsQuery, GetAccountInsightsQueryVariables>(GetAccountInsightsDocument, options);
      }
export function useGetAccountInsightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountInsightsQuery, GetAccountInsightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountInsightsQuery, GetAccountInsightsQueryVariables>(GetAccountInsightsDocument, options);
        }
export type GetAccountInsightsQueryHookResult = ReturnType<typeof useGetAccountInsightsQuery>;
export type GetAccountInsightsLazyQueryHookResult = ReturnType<typeof useGetAccountInsightsLazyQuery>;
export type GetAccountInsightsQueryResult = Apollo.QueryResult<GetAccountInsightsQuery, GetAccountInsightsQueryVariables>;
export const GetDailyBalancesDocument = gql`
    query GetDailyBalances($input: GetBalanceParams!) {
  getAccountDailyBalances(input: $input) {
    date
    balance
  }
}
    `;

/**
 * __useGetDailyBalancesQuery__
 *
 * To run a query within a React component, call `useGetDailyBalancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDailyBalancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDailyBalancesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDailyBalancesQuery(baseOptions: Apollo.QueryHookOptions<GetDailyBalancesQuery, GetDailyBalancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDailyBalancesQuery, GetDailyBalancesQueryVariables>(GetDailyBalancesDocument, options);
      }
export function useGetDailyBalancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDailyBalancesQuery, GetDailyBalancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDailyBalancesQuery, GetDailyBalancesQueryVariables>(GetDailyBalancesDocument, options);
        }
export type GetDailyBalancesQueryHookResult = ReturnType<typeof useGetDailyBalancesQuery>;
export type GetDailyBalancesLazyQueryHookResult = ReturnType<typeof useGetDailyBalancesLazyQuery>;
export type GetDailyBalancesQueryResult = Apollo.QueryResult<GetDailyBalancesQuery, GetDailyBalancesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    displayName
    firstName
    token
    avatar
    email
    createdAt
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    displayName
    firstName
    token
    avatar
    createdAt
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FetchUserDocument = gql`
    query fetchUser {
  getCurrentUser {
    id
    firstName
    displayName
    email
    avatar
    createdAt
  }
}
    `;

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchUserQuery(baseOptions?: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
      }
export function useFetchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<typeof useFetchUserLazyQuery>;
export type FetchUserQueryResult = Apollo.QueryResult<FetchUserQuery, FetchUserQueryVariables>;
export const AddTransactionDocument = gql`
    mutation addTransaction($input: TransactionInput!) {
  createTransaction(input: $input) {
    id
    userId
    payee
    description
    amount
    category {
      id
      name
    }
    type
    date
    account {
      id
      accountName
    }
    isCashIn
    isCashOut
    isUncategorized
  }
}
    `;
export type AddTransactionMutationFn = Apollo.MutationFunction<AddTransactionMutation, AddTransactionMutationVariables>;

/**
 * __useAddTransactionMutation__
 *
 * To run a mutation, you first call `useAddTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTransactionMutation, { data, loading, error }] = useAddTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTransactionMutation(baseOptions?: Apollo.MutationHookOptions<AddTransactionMutation, AddTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTransactionMutation, AddTransactionMutationVariables>(AddTransactionDocument, options);
      }
export type AddTransactionMutationHookResult = ReturnType<typeof useAddTransactionMutation>;
export type AddTransactionMutationResult = Apollo.MutationResult<AddTransactionMutation>;
export type AddTransactionMutationOptions = Apollo.BaseMutationOptions<AddTransactionMutation, AddTransactionMutationVariables>;
export const CreateTransferDocument = gql`
    mutation CreateTransfer($input: TransferInput!) {
  createTransfer(input: $input) {
    transactions {
      id
      payee
      description
      amount
      category {
        id
        name
      }
      type
      date
      accountId
      account {
        id
        accountName
      }
      isCashIn
      isCashOut
      isUncategorized
      isTransfer
      transferId
    }
    error {
      message
    }
  }
}
    `;
export type CreateTransferMutationFn = Apollo.MutationFunction<CreateTransferMutation, CreateTransferMutationVariables>;

/**
 * __useCreateTransferMutation__
 *
 * To run a mutation, you first call `useCreateTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTransferMutation, { data, loading, error }] = useCreateTransferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTransferMutation(baseOptions?: Apollo.MutationHookOptions<CreateTransferMutation, CreateTransferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTransferMutation, CreateTransferMutationVariables>(CreateTransferDocument, options);
      }
export type CreateTransferMutationHookResult = ReturnType<typeof useCreateTransferMutation>;
export type CreateTransferMutationResult = Apollo.MutationResult<CreateTransferMutation>;
export type CreateTransferMutationOptions = Apollo.BaseMutationOptions<CreateTransferMutation, CreateTransferMutationVariables>;
export const DeleteTransactionDocument = gql`
    mutation deleteTransaction($id: String!) {
  deleteTransaction(id: $id)
}
    `;
export type DeleteTransactionMutationFn = Apollo.MutationFunction<DeleteTransactionMutation, DeleteTransactionMutationVariables>;

/**
 * __useDeleteTransactionMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionMutation, { data, loading, error }] = useDeleteTransactionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTransactionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransactionMutation, DeleteTransactionMutationVariables>(DeleteTransactionDocument, options);
      }
export type DeleteTransactionMutationHookResult = ReturnType<typeof useDeleteTransactionMutation>;
export type DeleteTransactionMutationResult = Apollo.MutationResult<DeleteTransactionMutation>;
export type DeleteTransactionMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionMutation, DeleteTransactionMutationVariables>;
export const DeleteTransferDocument = gql`
    mutation DeleteTransfer($transferId: String!) {
  deleteTransfer(transferId: $transferId)
}
    `;
export type DeleteTransferMutationFn = Apollo.MutationFunction<DeleteTransferMutation, DeleteTransferMutationVariables>;

/**
 * __useDeleteTransferMutation__
 *
 * To run a mutation, you first call `useDeleteTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransferMutation, { data, loading, error }] = useDeleteTransferMutation({
 *   variables: {
 *      transferId: // value for 'transferId'
 *   },
 * });
 */
export function useDeleteTransferMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransferMutation, DeleteTransferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTransferMutation, DeleteTransferMutationVariables>(DeleteTransferDocument, options);
      }
export type DeleteTransferMutationHookResult = ReturnType<typeof useDeleteTransferMutation>;
export type DeleteTransferMutationResult = Apollo.MutationResult<DeleteTransferMutation>;
export type DeleteTransferMutationOptions = Apollo.BaseMutationOptions<DeleteTransferMutation, DeleteTransferMutationVariables>;
export const UpdateTransactionDocument = gql`
    mutation UpdateTransaction($input: TransactionInput!, $id: String!) {
  updateTransaction(input: $input, id: $id) {
    id
    userId
    payee
    description
    amount
    category {
      id
      name
    }
    type
    date
    account {
      id
      accountName
    }
    isCashIn
    isCashOut
    isUncategorized
  }
}
    `;
export type UpdateTransactionMutationFn = Apollo.MutationFunction<UpdateTransactionMutation, UpdateTransactionMutationVariables>;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionMutation, { data, loading, error }] = useUpdateTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateTransactionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransactionMutation, UpdateTransactionMutationVariables>(UpdateTransactionDocument, options);
      }
export type UpdateTransactionMutationHookResult = ReturnType<typeof useUpdateTransactionMutation>;
export type UpdateTransactionMutationResult = Apollo.MutationResult<UpdateTransactionMutation>;
export type UpdateTransactionMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionMutation, UpdateTransactionMutationVariables>;
export const UpdateTransferDocument = gql`
    mutation UpdateTransfer($input: TransferInput!, $transferId: String!) {
  updateTransfer(input: $input, transferId: $transferId) {
    transactions {
      id
      payee
      description
      amount
      category {
        id
        name
      }
      type
      date
      accountId
      account {
        id
        accountName
      }
      isCashIn
      isCashOut
      isUncategorized
      isTransfer
      transferId
    }
    error {
      message
    }
  }
}
    `;
export type UpdateTransferMutationFn = Apollo.MutationFunction<UpdateTransferMutation, UpdateTransferMutationVariables>;

/**
 * __useUpdateTransferMutation__
 *
 * To run a mutation, you first call `useUpdateTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransferMutation, { data, loading, error }] = useUpdateTransferMutation({
 *   variables: {
 *      input: // value for 'input'
 *      transferId: // value for 'transferId'
 *   },
 * });
 */
export function useUpdateTransferMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransferMutation, UpdateTransferMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTransferMutation, UpdateTransferMutationVariables>(UpdateTransferDocument, options);
      }
export type UpdateTransferMutationHookResult = ReturnType<typeof useUpdateTransferMutation>;
export type UpdateTransferMutationResult = Apollo.MutationResult<UpdateTransferMutation>;
export type UpdateTransferMutationOptions = Apollo.BaseMutationOptions<UpdateTransferMutation, UpdateTransferMutationVariables>;
export const FetchAccountsDocument = gql`
    query fetchAccounts {
  getAccounts {
    id
    accountName
  }
}
    `;

/**
 * __useFetchAccountsQuery__
 *
 * To run a query within a React component, call `useFetchAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAccountsQuery(baseOptions?: Apollo.QueryHookOptions<FetchAccountsQuery, FetchAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAccountsQuery, FetchAccountsQueryVariables>(FetchAccountsDocument, options);
      }
export function useFetchAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAccountsQuery, FetchAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAccountsQuery, FetchAccountsQueryVariables>(FetchAccountsDocument, options);
        }
export type FetchAccountsQueryHookResult = ReturnType<typeof useFetchAccountsQuery>;
export type FetchAccountsLazyQueryHookResult = ReturnType<typeof useFetchAccountsLazyQuery>;
export type FetchAccountsQueryResult = Apollo.QueryResult<FetchAccountsQuery, FetchAccountsQueryVariables>;
export const FetchAccountsAndCategoriesDocument = gql`
    query fetchAccountsAndCategories {
  getAccounts(filter: {isInactive: true}) {
    id
    accountName
  }
  getCategories {
    id
    name
  }
}
    `;

/**
 * __useFetchAccountsAndCategoriesQuery__
 *
 * To run a query within a React component, call `useFetchAccountsAndCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAccountsAndCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAccountsAndCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAccountsAndCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FetchAccountsAndCategoriesQuery, FetchAccountsAndCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAccountsAndCategoriesQuery, FetchAccountsAndCategoriesQueryVariables>(FetchAccountsAndCategoriesDocument, options);
      }
export function useFetchAccountsAndCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAccountsAndCategoriesQuery, FetchAccountsAndCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAccountsAndCategoriesQuery, FetchAccountsAndCategoriesQueryVariables>(FetchAccountsAndCategoriesDocument, options);
        }
export type FetchAccountsAndCategoriesQueryHookResult = ReturnType<typeof useFetchAccountsAndCategoriesQuery>;
export type FetchAccountsAndCategoriesLazyQueryHookResult = ReturnType<typeof useFetchAccountsAndCategoriesLazyQuery>;
export type FetchAccountsAndCategoriesQueryResult = Apollo.QueryResult<FetchAccountsAndCategoriesQuery, FetchAccountsAndCategoriesQueryVariables>;
export const FetchCategoriesDocument = gql`
    query fetchCategories {
  getCategories {
    id
    name
  }
}
    `;

/**
 * __useFetchCategoriesQuery__
 *
 * To run a query within a React component, call `useFetchCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FetchCategoriesQuery, FetchCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchCategoriesQuery, FetchCategoriesQueryVariables>(FetchCategoriesDocument, options);
      }
export function useFetchCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCategoriesQuery, FetchCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchCategoriesQuery, FetchCategoriesQueryVariables>(FetchCategoriesDocument, options);
        }
export type FetchCategoriesQueryHookResult = ReturnType<typeof useFetchCategoriesQuery>;
export type FetchCategoriesLazyQueryHookResult = ReturnType<typeof useFetchCategoriesLazyQuery>;
export type FetchCategoriesQueryResult = Apollo.QueryResult<FetchCategoriesQuery, FetchCategoriesQueryVariables>;
export const GetTransactionsRangeDocument = gql`
    query GetTransactionsRange($input: RangeParams!, $accountId: String) {
  getTransactionsRange(input: $input, accountId: $accountId) {
    ...TransactionFields
    isCashIn
    isCashOut
    isUncategorized
    isTransfer
    transferId
  }
}
    ${TransactionFieldsFragmentDoc}`;

/**
 * __useGetTransactionsRangeQuery__
 *
 * To run a query within a React component, call `useGetTransactionsRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsRangeQuery({
 *   variables: {
 *      input: // value for 'input'
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetTransactionsRangeQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsRangeQuery, GetTransactionsRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsRangeQuery, GetTransactionsRangeQueryVariables>(GetTransactionsRangeDocument, options);
      }
export function useGetTransactionsRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsRangeQuery, GetTransactionsRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsRangeQuery, GetTransactionsRangeQueryVariables>(GetTransactionsRangeDocument, options);
        }
export type GetTransactionsRangeQueryHookResult = ReturnType<typeof useGetTransactionsRangeQuery>;
export type GetTransactionsRangeLazyQueryHookResult = ReturnType<typeof useGetTransactionsRangeLazyQuery>;
export type GetTransactionsRangeQueryResult = Apollo.QueryResult<GetTransactionsRangeQuery, GetTransactionsRangeQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions {
  getTransactions {
    id
    payee
    description
    amount
    category {
      id
      name
    }
    type
    date
    accountId
    account {
      accountName
      id
    }
    isCashIn
    isCashOut
    isUncategorized
    isTransfer
    transferId
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, options);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetTransferDocument = gql`
    query GetTransfer($id: String!) {
  getTransfer(id: $id) {
    id
    date
    amount
    description
    fromAccount {
      accountName
      id
    }
    toAccount {
      accountName
      id
    }
    category {
      name
      id
    }
  }
}
    `;

/**
 * __useGetTransferQuery__
 *
 * To run a query within a React component, call `useGetTransferQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransferQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransferQuery(baseOptions: Apollo.QueryHookOptions<GetTransferQuery, GetTransferQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransferQuery, GetTransferQueryVariables>(GetTransferDocument, options);
      }
export function useGetTransferLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransferQuery, GetTransferQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransferQuery, GetTransferQueryVariables>(GetTransferDocument, options);
        }
export type GetTransferQueryHookResult = ReturnType<typeof useGetTransferQuery>;
export type GetTransferLazyQueryHookResult = ReturnType<typeof useGetTransferLazyQuery>;
export type GetTransferQueryResult = Apollo.QueryResult<GetTransferQuery, GetTransferQueryVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    balance
    bankName
    accountName
    accountType
    isAsset
    isLiability
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($accountId: String!) {
  deleteAccount(accountId: $accountId)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const EditAccountDocument = gql`
    mutation EditAccount($accountId: String!, $input: EditAccountInput!) {
  editAccount(accountId: $accountId, input: $input) {
    id
    accountName
    accountType
    isAsset
    isLiability
    balance
    bankName
  }
}
    `;
export type EditAccountMutationFn = Apollo.MutationFunction<EditAccountMutation, EditAccountMutationVariables>;

/**
 * __useEditAccountMutation__
 *
 * To run a mutation, you first call `useEditAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountMutation, { data, loading, error }] = useEditAccountMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditAccountMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountMutation, EditAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccountMutation, EditAccountMutationVariables>(EditAccountDocument, options);
      }
export type EditAccountMutationHookResult = ReturnType<typeof useEditAccountMutation>;
export type EditAccountMutationResult = Apollo.MutationResult<EditAccountMutation>;
export type EditAccountMutationOptions = Apollo.BaseMutationOptions<EditAccountMutation, EditAccountMutationVariables>;
export const ToggleAccountActiveStatusDocument = gql`
    mutation ToggleAccountActiveStatus($accountId: String!) {
  toggleAccountActiveStatus(accountId: $accountId) {
    id
    accountName
    accountType
    isAsset
    isLiability
    balance
    isInactive
  }
}
    `;
export type ToggleAccountActiveStatusMutationFn = Apollo.MutationFunction<ToggleAccountActiveStatusMutation, ToggleAccountActiveStatusMutationVariables>;

/**
 * __useToggleAccountActiveStatusMutation__
 *
 * To run a mutation, you first call `useToggleAccountActiveStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleAccountActiveStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleAccountActiveStatusMutation, { data, loading, error }] = useToggleAccountActiveStatusMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useToggleAccountActiveStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleAccountActiveStatusMutation, ToggleAccountActiveStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleAccountActiveStatusMutation, ToggleAccountActiveStatusMutationVariables>(ToggleAccountActiveStatusDocument, options);
      }
export type ToggleAccountActiveStatusMutationHookResult = ReturnType<typeof useToggleAccountActiveStatusMutation>;
export type ToggleAccountActiveStatusMutationResult = Apollo.MutationResult<ToggleAccountActiveStatusMutation>;
export type ToggleAccountActiveStatusMutationOptions = Apollo.BaseMutationOptions<ToggleAccountActiveStatusMutation, ToggleAccountActiveStatusMutationVariables>;
export const GetAccountsDocument = gql`
    query GetAccounts($filter: AccountQueryFilters) {
  getAccounts(filter: $filter) {
    id
    accountName
    accountType
    isAsset
    isLiability
    isInactive
    balance
    bankName
    updatedAt
  }
}
    `;

/**
 * __useGetAccountsQuery__
 *
 * To run a query within a React component, call `useGetAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAccountsQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
      }
export function useGetAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountsQuery, GetAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountsQuery, GetAccountsQueryVariables>(GetAccountsDocument, options);
        }
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>;
export type GetAccountsLazyQueryHookResult = ReturnType<typeof useGetAccountsLazyQuery>;
export type GetAccountsQueryResult = Apollo.QueryResult<GetAccountsQuery, GetAccountsQueryVariables>;
export const GetAssetsAndLiabilitiesDocument = gql`
    query GetAssetsAndLiabilities {
  getAssetsAndLiabilites {
    aggregateBalance
    assets {
      amount
    }
    liabilites {
      amount
      percentOfAssets
    }
  }
}
    `;

/**
 * __useGetAssetsAndLiabilitiesQuery__
 *
 * To run a query within a React component, call `useGetAssetsAndLiabilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetsAndLiabilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetsAndLiabilitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAssetsAndLiabilitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsAndLiabilitiesQuery, GetAssetsAndLiabilitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsAndLiabilitiesQuery, GetAssetsAndLiabilitiesQueryVariables>(GetAssetsAndLiabilitiesDocument, options);
      }
export function useGetAssetsAndLiabilitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsAndLiabilitiesQuery, GetAssetsAndLiabilitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsAndLiabilitiesQuery, GetAssetsAndLiabilitiesQueryVariables>(GetAssetsAndLiabilitiesDocument, options);
        }
export type GetAssetsAndLiabilitiesQueryHookResult = ReturnType<typeof useGetAssetsAndLiabilitiesQuery>;
export type GetAssetsAndLiabilitiesLazyQueryHookResult = ReturnType<typeof useGetAssetsAndLiabilitiesLazyQuery>;
export type GetAssetsAndLiabilitiesQueryResult = Apollo.QueryResult<GetAssetsAndLiabilitiesQuery, GetAssetsAndLiabilitiesQueryVariables>;
export const GetBalanceHistoriesDocument = gql`
    query GetBalanceHistories($input: RangeParams!) {
  getAggregatedDailyBalances(input: $input) {
    date
    balance
  }
}
    `;

/**
 * __useGetBalanceHistoriesQuery__
 *
 * To run a query within a React component, call `useGetBalanceHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalanceHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalanceHistoriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetBalanceHistoriesQuery(baseOptions: Apollo.QueryHookOptions<GetBalanceHistoriesQuery, GetBalanceHistoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBalanceHistoriesQuery, GetBalanceHistoriesQueryVariables>(GetBalanceHistoriesDocument, options);
      }
export function useGetBalanceHistoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBalanceHistoriesQuery, GetBalanceHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBalanceHistoriesQuery, GetBalanceHistoriesQueryVariables>(GetBalanceHistoriesDocument, options);
        }
export type GetBalanceHistoriesQueryHookResult = ReturnType<typeof useGetBalanceHistoriesQuery>;
export type GetBalanceHistoriesLazyQueryHookResult = ReturnType<typeof useGetBalanceHistoriesLazyQuery>;
export type GetBalanceHistoriesQueryResult = Apollo.QueryResult<GetBalanceHistoriesQuery, GetBalanceHistoriesQueryVariables>;