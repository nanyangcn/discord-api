import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

// import todoLists from '../../utils/todoLists';
import dbTodoList from '../../utils/db';

const typeDefs = gql`
  extend type Query {
    allTodoLists: [TodoList!]!
  }
`;

const resolvers: IResolvers = {
  Query: {
    allTodoLists: () => dbTodoList.dbGetAll(),
  }
};

export default {
  typeDefs,
  resolvers,
};