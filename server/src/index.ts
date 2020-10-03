import { GraphQLServer } from 'graphql-yoga';

import resolvers from '../resolvers';
import typeDefs from '../typeDefinitions';

const options = {
  endpoint: '/graphql',
  playground: '/playground',
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(options, () =>
  console.log(
    `Server is running at http://localhost:4000 and playground is available at http://localhost:4000/playground`
  )
);
