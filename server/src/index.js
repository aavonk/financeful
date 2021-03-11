import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import { APIContainer } from './api';
import { seedData } from './seed-data/script';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const startServer = async () => {
  try {
    const app = express();
    // eslint-disable-next-line no-undef
    const PORT = process.env.PORT || 4000;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req }),
      dataSources: () => APIContainer,
    });

    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    if (process.argv.includes('--seed-data')) {
      await seedData();
    }

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
      ),
    );
  } catch (err) {
    console.error(err.message);
  }
};

startServer();
