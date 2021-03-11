import { usersResolver } from './users';
import { transactionResolvers } from './transactions';

export const resolvers = {
   Query: {
      ...transactionResolvers.Query,
   },
   Mutation: {
      ...usersResolver.Mutation,
      ...transactionResolvers.Mutation,
   },
};
