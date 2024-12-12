import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    SERVER_API_URL: 'http://localhost:3000',

    MONGO_DB_CONNECTION_STRING: '',
    NEO4J_URI: '',
    NEO4J_USER: '',
    NEO4J_PASSWORD: ''
};
