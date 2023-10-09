
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs.js';
import authMiddleware from '../config/authMiddleware.js';
import authorizationMiddleware from '../config/authorizationMiddleware.js';
import errorMiddleware from '../config/errorMiddleware.js';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

server.applyMiddleware({ app });

// Apply error middleware
app.use(errorMiddleware);

app.listen({ port: 4000 }, () =>
  console.log('Server is running at http://localhost:4000' + server.graphqlPath)
);
