import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  const PORT = process.env.port || 4000;
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, AuthResolver],
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
