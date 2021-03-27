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
  getCategories: Array<Category>;
  getAccounts: Array<Account>;
};


export type QueryGetTransactionArgs = {
  id: Scalars['String'];
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
  accountId: Scalars['ID'];
  account?: Maybe<Account>;
  isCashIn?: Maybe<Scalars['Boolean']>;
  isCashOut?: Maybe<Scalars['Boolean']>;
  isUncategorized?: Maybe<Scalars['Boolean']>;
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
  isAsset?: Maybe<Scalars['Boolean']>;
  isLiability?: Maybe<Scalars['Boolean']>;
  balance?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: User;
  register: User;
  createTransaction: Transaction;
  deleteTransaction: Scalars['String'];
  updateTransaction: Transaction;
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
  input: Updates;
  id: Scalars['String'];
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
  date: Scalars['String'];
  amount: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  accountId: Scalars['String'];
};

export type Updates = {
  payee?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};

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

export type FetchUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'displayName' | 'email' | 'avatar' | 'createdAt'>
  ) }
);

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { getTransactions?: Maybe<Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'userId' | 'payee' | 'description' | 'amount' | 'type' | 'date' | 'accountId' | 'isCashIn' | 'isCashOut' | 'isUncategorized'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    )>, account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'accountName' | 'id'>
    )> }
  )>> }
);


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
  getAccounts {
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
export const GetTransactionsDocument = gql`
    query GetTransactions {
  getTransactions {
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
    accountId
    account {
      accountName
      id
    }
    isCashIn
    isCashOut
    isUncategorized
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