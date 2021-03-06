import 'reflect-metadata';
import 'module-alias/register';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker as customAuthChecker } from './lib/auth-checker';

// Resolvers  =========================================================================
import { UserResolver } from '@Modules/Users/resolvers/UserResolver';
import { AuthResolver } from '@Modules/Auth/resolvers/AuthResolver';
import { TransactionResolver } from '@Modules/Transactions/resolvers/TransactionResolver';
import { TransferResolver } from '@Modules/Transactions/resolvers/TransferResolver';
import { AccountResolver } from '@Modules/BankAccounts/resolvers/AccountResolver';
import { CategoryResolver } from '@Modules/Categories/resolvers/CategoryResolver';
import { BudgetResolver } from '@Modules/Budgets/resolvers/BudgetResolver';

// Repos & Services =========================================================================
import { TransferRepo } from '@Modules/Transactions/repos/implementations/transferRepo';
import { AccountRepo } from '@Modules/BankAccounts/repos/implementations/accountRepo';
import { CategoryRepo } from '@Modules/Categories/repos/implementations/categoryRepo';
import { UserRepo } from '@Modules/Users/repos/implementations/userRepo';
import { AccountDataRepo } from '@Modules/BankAccounts/repos/implementations/accountDataRepo';
import { AggregateAccountData } from '@Modules/BankAccounts/repos/implementations/aggregateAccountData';
import { InsightsService } from '@Modules/BankAccounts/services/implementations/insightService';
import { AccountDataResolver } from '@Modules/BankAccounts/resolvers/AccountDataResolver';
import { transactionService } from '@Modules/Transactions/services';
import { authService } from '@Modules/Auth/services';
import { budgetService } from '@Modules/Budgets/services';
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
        AccountDataResolver,
        BudgetResolver,
      ],
      authChecker: customAuthChecker,
    }),
    context: ({ req }) => ({
      req,
      transferRepo: new TransferRepo(prisma),
      accountRepo: new AccountRepo(prisma),
      categoryRepo: new CategoryRepo(prisma),
      userRepo: new UserRepo(prisma),
      accountDataRepo: new AccountDataRepo(prisma),
      aggregateAccountDataRepo: new AggregateAccountData(prisma),
      services: {
        insightService: new InsightsService(),
        transactionService,
        authService,
        budgetService,
      },
    }),
  });

  app.listen({ port: PORT }, () => {
    console.log(
      `???? Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });

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
