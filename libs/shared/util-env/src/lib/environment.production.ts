import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://happy-pebble-06ed2bf03.5.azurestaticapps.net',
    SERVER_API_URL: 'https://train-api.azurewebsites.net',


    // this is permitted for now
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://sbsterrenburg:PzYmiOkbw5bjwq89@traindb.c6xon.mongodb.net/database'
};
