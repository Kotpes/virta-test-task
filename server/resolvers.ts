import fetch from 'node-fetch';
require('dotenv').config();

const VIRTA_REST_API_URL = process.env.VIRTA_API_URL;

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
    ? `${VIRTA_REST_API_URL}/${stationId}`
    : `${VIRTA_REST_API_URL}/`;

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

export default resolvers;
