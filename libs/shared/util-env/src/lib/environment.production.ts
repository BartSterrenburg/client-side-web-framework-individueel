import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    SERVER_API_URL: 'https://nxworkshop.azurewebsites.net/api',


    // this is permitted for now
    MONGO_DB_CONNECTION_STRING: 'mongodb://remote-host/mongodb'
};
