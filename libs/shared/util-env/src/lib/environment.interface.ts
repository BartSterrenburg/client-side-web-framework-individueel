export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    SERVER_API_URL: string;

    MONGO_DB_CONNECTION_STRING: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is
}
