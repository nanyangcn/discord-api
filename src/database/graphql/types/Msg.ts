import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

const typeDefs = gql`
  type Msg {
    id: ID!
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    }
  }
`;

const resolvers: IResolvers = {};

export default {
  typeDefs,
  resolvers,
};
