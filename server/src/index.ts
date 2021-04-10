import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker as customAuthChecker } from './lib/auth-checker';
import { AuthResolver } from '@Modules/Auth/resolvers/AuthResolver';
import { UserResolver } from '@Modules/Users/resolvers/UserResolver';
import { TransactionResolver } from '@Modules/Transactions/resolvers/TransactionResolver';
import { TransferResolver } from '@Modules/Transactions/resolvers/TransferResolver';
import { AccountResolver } from '@Modules/BankAccounts/resolvers/AccountResolver';
import { CategoryResolver } from '@Modules/Transactions/resolvers/CategoryResolver';
import { TransferRepo } from '@Modules/Transactions/repos/TransferRepo';
import { AccountRepo } from '@Modules/BankAccounts/repos/implementations/accountRepo';
import prisma from '@Shared/database/prisma';

const main = async () => {
  const app = express();
  const PORT = process.env.port || 4000;
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
        UserResolver,
        TransactionResolver,
        TransferResolver,
        CategoryResolver,
        AccountResolver,
      ],
      authChecker: customAuthChecker,
    }),
    context: ({ req }) => ({
      req,
      prisma,
      transferService: new TransferRepo(prisma),
      accountRepo: new AccountRepo(),
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
