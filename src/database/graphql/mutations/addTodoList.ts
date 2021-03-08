import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

// import todoLists from '../../utils/todoLists';
import dbTodoList from '../../utils/db';
import { TodoList } from '../../utils/todoLists';
import nats from '../../utils/nats';

const typeDefs = gql`
  extend type Mutation {
    addTodoList(
      title: String!
      done: Boolean!
    ): TodoList
  }
`;

const resolvers: IResolvers = {
  Mutation: {
    addTodoList: async (_root, args: TodoList): Promise<TodoList> => {
      const response = await dbTodoList.dbAddOne(args);
      console.log(`CREATE a todolist: ${JSON.stringify(response)}`);
      const message = nats.messageGenerator(args, 'created');
      nats.publish(message);
      return response;
    },
  }
};

export default {
  typeDefs,
  resolvers,
};
