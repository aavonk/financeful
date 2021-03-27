import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { authChecker as customAuthChecker } from './lib/auth-checker';
import { AuthResolver } from './resolvers/AuthResolver';
import { UserResolver } from './resolvers/Users/UserResolver';
import { TransactionResolver } from './resolvers/Transactions/TransactionResolver';
import { CategoryResolver } from './resolvers/Categories/CategoryResolver';
import { AccountResolver } from './resolvers/Accounts/AccountResolver';

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  const PORT = process.env.port || 4000;
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
        UserResolver,
        TransactionResolver,
        CategoryResolver,
        AccountResolver,
      ],
      authChecker: customAuthChecker,
    }),
    context: ({ req }) => ({
      req,
      prisma,
    }),
  });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );
  server.applyMiddleware({ app });
};

main()
  .catch((e) => {
    console.error(e.message);
    throw e;
  })
  .finally(() => {
    prisma.$disconnect();
  });
