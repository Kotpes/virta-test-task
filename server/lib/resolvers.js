const fetch = require('node-fetch');

const getStations = async (stationId) => {
  const requestUrl = stationId
    ? `https://api.test.virtaglobal.com/stations/${stationId}`
    : `https://api.test.virtaglobal.com/stations/`;

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

module.exports = resolvers;
