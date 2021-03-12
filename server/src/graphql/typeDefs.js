import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input RegisterInput {
    displayName: String!
    email: String!
    password: String!
    passwordConfirmation: String!
  }
  input TransactionInput {
    payee: String!
    date: String!
    amount: Float!
    category: String
    type: String
  }
  input TransactionUpdates {
    payee: String
    date: String
    amount: Float
    category: String
    type: String
  }
  type User {
    id: ID!
    displayName: String!
    firstName: String
    avatar: String
    createdAt: String!
    token: String
    email: String
  }
  type Transaction {
    id: ID!
    payee: String!
    date: String!
    amount: Float!
    category: String
    type: String
    createdAt: String
    updatedAt: String
    user: String!
  }
  type DeleteResponse {
    message: String
    id: ID!
  }
  type Query {
    getTransactions: [Transaction]!
    getTransaction(transId: ID!): Transaction!
    getCurrentUser: User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createTransaction(transactionInput: TransactionInput): Transaction!
    deleteTransaction(transId: ID!): DeleteResponse!
    updateTransaction(transId: ID!, updates: TransactionUpdates): Transaction
  }
`;
