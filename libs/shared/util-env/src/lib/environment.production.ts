import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://ambitious-desert-025798303.4.azurestaticapps.net',
    SERVER_API_URL: 'https://train-api.azurewebsites.net',


    // this is permitted for now
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://sbsterrenburg:PzYmiOkbw5bjwq89@traindb.c6xon.mongodb.net/database',
    NEO4J_URI: 'neo4j+s://87c86aee.databases.neo4j.io',
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: 'Ka5W-MnFIbYKoFE61A5G0DSY9DSTVAc4Ea16xNH4eP4'
};
