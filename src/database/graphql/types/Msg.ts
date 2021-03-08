import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

const typeDefs = gql`
  type Msg {
    id: ID!
    title: String!
    done: Boolean!
  }
`;

const resolvers: IResolvers = {};

export default {
  typeDefs,
  resolvers,
};
