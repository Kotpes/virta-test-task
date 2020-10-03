import { ApolloServer } from '@saeris/apollo-server-vercel';

import resolvers from '../resolvers';
import typeDefs from '../typeDefinitions';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

export default server.createHandler();
