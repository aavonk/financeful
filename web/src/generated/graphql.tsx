import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type RegisterInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type TransactionInput = {
  payee: Scalars['String'];
  date: Scalars['String'];
  amount: Scalars['Float'];
  category?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type TransactionUpdates = {
  payee?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  payee: Scalars['String'];
  date: Scalars['String'];
  amount: Scalars['Float'];
  category?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user: Scalars['String'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  message?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getTransactions: Array<Maybe<Transaction>>;
  getTransaction: Transaction;
  getCurrentUser?: Maybe<User>;
};

export type QueryGetTransactionArgs = {
  transId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: User;
  createTransaction: Transaction;
  deleteTransaction: DeleteResponse;
  updateTransaction?: Maybe<Transaction>;
};

export type MutationRegisterArgs = {
  registerInput?: Maybe<RegisterInput>;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateTransactionArgs = {
  transactionInput?: Maybe<TransactionInput>;
};

export type MutationDeleteTransactionArgs = {
  transId: Scalars['ID'];
};

export type MutationUpdateTransactionArgs = {
  transId: Scalars['ID'];
  updates?: Maybe<TransactionUpdates>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'displayName'
    | 'firstName'
    | 'token'
    | 'avatar'
    | 'email'
    | 'createdAt'
  >;
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<
    User,
    'id' | 'email' | 'displayName' | 'firstName' | 'token' | 'avatar'
  >;
};

export type FetchUserQueryVariables = Exact<{ [key: string]: never }>;

export type FetchUserQuery = { __typename?: 'Query' } & {
  getCurrentUser?: Maybe<
    { __typename?: 'User' } & Pick<
      User,
      'id' | 'firstName' | 'displayName' | 'email' | 'avatar' | 'createdAt'
    >
  >;
};

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTransactionsQuery = { __typename?: 'Query' } & {
  getTransactions: Array<
    Maybe<
      { __typename?: 'Transaction' } & Pick<
        Transaction,
        'id' | 'date' | 'payee' | 'category' | 'type' | 'createdAt'
      >
    >
  >;
};

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
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

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
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      email
      displayName
      firstName
      token
      avatar
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

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
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
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
export function useFetchUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchUserQuery,
    FetchUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(
    FetchUserDocument,
    options,
  );
}
export function useFetchUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserQuery,
    FetchUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(
    FetchUserDocument,
    options,
  );
}
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<
  typeof useFetchUserLazyQuery
>;
export type FetchUserQueryResult = Apollo.QueryResult<
  FetchUserQuery,
  FetchUserQueryVariables
>;
export const GetTransactionsDocument = gql`
  query GetTransactions {
    getTransactions {
      id
      date
      payee
      category
      type
      createdAt
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
export function useGetTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(
    GetTransactionsDocument,
    options,
  );
}
export function useGetTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >(GetTransactionsDocument, options);
}
export type GetTransactionsQueryHookResult = ReturnType<
  typeof useGetTransactionsQuery
>;
export type GetTransactionsLazyQueryHookResult = ReturnType<
  typeof useGetTransactionsLazyQuery
>;
export type GetTransactionsQueryResult = Apollo.QueryResult<
  GetTransactionsQuery,
  GetTransactionsQueryVariables
>;
