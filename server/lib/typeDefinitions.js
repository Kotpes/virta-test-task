const typeDefs = `
  type Query {
    stations(id: String): [Station]
  }

  type StationType {
    vendor: String
    sockettypes: String
    connectors: String
    instructions_url: String
  }

  type Station {
    station_ID: Int
    location_ID: Int
    seller_ID: Int
    name: String
    connected: Boolean
    position: String
    available: Boolean
    lastconnect: String
    roaming_identifier_cpo: String
    sockets: Int
    reservable: Boolean
    stationType: StationType
  }
`;

module.exports = typeDefs;
