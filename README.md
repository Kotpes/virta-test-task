## Client app and GraphQL server for Virta charging stations API

### <a href="https://virta-client.vercel.app" target="_blank">Demo</a>

#### Server setup

To try out server locally, navigate to `/server` directory, run `yarn` to
install dependencies and `yarn start` to start the server.

GraphQL playground will be available on `http://localhost:3000`

For the hosted demo, server was deployed to [vercel.com](https://vercel.com)
(formely known as now.sh)

Server is using
[apollo-server-micro](https://www.npmjs.com/package/apollo-server-micro) as
GraphQL server with some `cors` layer.

#### Client setup

To run code locally, navigate to `/client`, run `yarn` to install dependencies
and `yarn start` to start the app. If CL won't start the browser, app should be
available on `http://localhost:3000`

Client code was bootstrapped using
[create-react-app](https://create-react-app.dev) and uses TypeScript.

To perform GraphQL queries, [swr](https://swr.vercel.app) together with
[graphql-request](https://github.com/prisma-labs/graphql-request) libraries are
used.
