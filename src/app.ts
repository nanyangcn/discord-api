import express from 'express';
import 'express-async-errors';
import { ApolloServer } from 'apollo-server-express';

import { connectMongoDb, initMongoDb } from './database/dbInit';
import middleware from './utils/middleware';

const app = express();

void connectMongoDb();
void initMongoDb();

app.use(express.json());

app.use(middleware.unknownEndpoint);
app.use(middleware.errorhandler);

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    console.error(`ERROR: ${err.message}`);
    return err;
  },
});

server.applyMiddleware({ app });

export default app;
