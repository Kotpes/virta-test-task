import { GraphQLServer } from 'graphql-yoga';
import fetch from 'node-fetch';

const VIRTA_REST_API = 'https://api.test.virtaglobal.com/stations';

type StationType = {
  vendor: string;
  sockettypes: string;
  connectors: number;
  instructions_url: string;
};

interface Station {
  station_ID: number;
  location_ID: number;
  seller_ID: number;
  name: string;
  connected: boolean;
  position: string;
  available: boolean;
  lastconnect: string;
  roaming_identifier_cpo: string;
  sockets: number;
  reservable: boolean;
  stationType: StationType;
}

const getStations = async (
  stationId?: string
): Promise<Station[] | Station> => {
  const requestUrl = stationId
    ? `${VIRTA_REST_API}/${stationId}`
    : `${VIRTA_REST_API}/`;

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
    stations: async (_: any, { id }: { id?: string }) => {
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
