const cors = require('micro-cors')(); // highlight-line
const { ApolloServer, gql } = require('apollo-server-micro');

const resolvers = require('../lib/resolvers.js');
const typeDefs = require('../lib/typeDefinitions.js');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});
const handler = apolloServer.createHandler({ path: '/api' });
module.exports = cors((req, res) =>
  req.method === 'OPTIONS' ? res.end() : handler(req, res)
);
