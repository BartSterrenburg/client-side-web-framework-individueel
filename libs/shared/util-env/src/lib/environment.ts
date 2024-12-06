import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    SERVER_API_URL: 'http://localhost:3000',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/shareameal'
};
