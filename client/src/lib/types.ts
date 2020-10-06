interface StationType {
  vendor: string;
  sockettypes: string;
  connectors: string;
  instructions_url: string;
}

export interface Station {
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
