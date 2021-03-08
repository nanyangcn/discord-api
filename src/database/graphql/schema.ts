import { gql, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { merge } from 'lodash';

import TodoList from './types/Msg';
import allTodoListsQuery from './queries/allTodoLists';
import addTodoListMutation from './mutations/addTodoList';
import editTodoListMutation from './mutations/editTodoList';

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  TodoList.typeDefs,
  allTodoListsQuery.typeDefs,
  addTodoListMutation.typeDefs,
  editTodoListMutation.typeDefs,
];

const resolvers = merge(
  TodoList.resolvers,
  allTodoListsQuery.resolvers,
  addTodoListMutation.resolvers,
  editTodoListMutation.resolvers
);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
