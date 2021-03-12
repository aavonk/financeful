import { usersResolver } from './users';
import { transactionResolvers } from './transactions';

export const resolvers = {
  Query: {
    ...usersResolver.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...transactionResolvers.Mutation,
  },
};
