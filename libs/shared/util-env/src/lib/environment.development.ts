import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    SERVER_API_URL: 'http://localhost:3000',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/database',
    NEO4J_URI: 'neo4j+s://87c86aee.databases.neo4j.io',
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: 'Ka5W-MnFIbYKoFE61A5G0DSY9DSTVAc4Ea16xNH4eP4'
};
