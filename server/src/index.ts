import { ApolloServer } from 'apollo-server';

import resolvers from '../resolvers';
import typeDefs from '../typeDefinitions';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(
    `Server ready at ${url} and playground is available at ${url}playground`
  );
});
