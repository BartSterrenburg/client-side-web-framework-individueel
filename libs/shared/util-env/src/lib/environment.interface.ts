export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    SERVER_API_URL: string;

    MONGO_DB_CONNECTION_STRING: string;
    NEO4J_URI: string;
    NEO4J_USER: string;
    NEO4J_PASSWORD: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is
}
