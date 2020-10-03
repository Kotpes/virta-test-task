### Simple GraphQL server that uses virta test REST API to resolve queries

### Server setup

Clone repo and `cd server` Create an `.env` file (`cp .env.example .env`) and
update it with working REST API url.

and run `yarn` to install dependencies.

### Running the server

To run server locally, first .

To start the server:

```bash
yarn start
```

It'll be running on [http://localhost:4000](http://localhost:4000) and GrpahQL
playground will be available on
[http://localhost:4000/playground](http://localhost:4000/playground)

### Client setup

To be continued

### Notes

There's `api/graphql.ts` used to create a serverless function to run on vercel
