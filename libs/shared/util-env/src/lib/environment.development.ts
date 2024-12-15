import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    SERVER_API_URL: 'http://localhost:3000',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/testdb',
    NEO4J_URI: 'bolt://localhost:7687',
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: 'Bert2650'
};
