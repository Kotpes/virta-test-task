const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

const VIRTA_REST_API = 'https://api.test.virtaglobal.com/stations';

const getStations = async (stationId) => {
  const requestUrl = stationId
    ? `${VIRTA_REST_API}/${stationId}`
    : `${VIRTA_REST_API}/`;

  console.log('requestUrl', requestUrl);

  try {
    const request = await fetch(requestUrl);
    const result = await request.json();

    if (Array.isArray(result)) {
      return result.map((station) => {
        return {
          ...station,
          connected: !!station.connected,
          available: !!station.available,
        };
      });
    } else {
      return [
        {
          ...result,
          connected: !!result.connected,
          available: !!result.available,
        },
      ];
    }
  } catch (error) {
    throw new Error(error);
  }
};

const resolvers = {
  Query: {
    stations: async (_, { id }) => {
      const stations = getStations(id);
      return stations;
    },
  },
};
const options = {
  endpoint: '/graphql',
  playground: '/playground',
};
const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
});
server.start(options, () => console.log(`Server is running`));
