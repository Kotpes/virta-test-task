"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const node_fetch_1 = __importDefault(require("node-fetch"));
const VIRTA_REST_API = 'https://api.test.virtaglobal.com/stations';
const getStations = async (stationId) => {
    const requestUrl = stationId
        ? `${VIRTA_REST_API}/${stationId}`
        : `${VIRTA_REST_API}/`;
    try {
        const request = await node_fetch_1.default(requestUrl);
        const result = await request.json();
        if (Array.isArray(result)) {
            return result.map((station) => {
                return {
                    ...station,
                    connected: !!station.connected,
                    available: !!station.available,
                };
            });
        }
        else {
            return [
                {
                    ...result,
                    connected: !!result.connected,
                    available: !!result.available,
                },
            ];
        }
    }
    catch (error) {
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
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
});
server.start(options, () => console.log(`Server is running`));
