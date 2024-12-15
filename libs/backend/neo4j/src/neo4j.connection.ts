import neo4j, { Driver } from 'neo4j-driver';
import { environment } from './../../../shared/util-env/src/index';
import { Logger } from '@nestjs/common';

export class neo4JConnection {
    private neo4jDriver: Driver;

    constructor() {
        // Configuratie voor Neo4j
        this.neo4jDriver = neo4j.driver(
            environment.NEO4J_URI, // URI van je Neo4j-database
            neo4j.auth.basic(environment.NEO4J_USER, environment.NEO4J_PASSWORD) // Gebruiker en wachtwoord voor Neo4j
        );

        this.connectToNeo4j();
    }

    // Methode voor verbinding met Neo4j en loggen van succes of fouten
    private async connectToNeo4j() {
        try {
            const session = this.neo4jDriver.session();
            await session.run('RETURN 1'); // Voer een eenvoudige query uit om verbinding te testen
            session.close();
            Logger.verbose('Neo4j connected successfully');
        } catch (error) {
            Logger.error('Error connecting to Neo4j', error);
        }
    }

    async runQuery(query: string, parameters: any = {}): Promise<any> {
        const session = this.neo4jDriver.session();
        try {
            const result = await session.run(query, parameters);
            Logger.log(`Query parameters: ${JSON.stringify(parameters)}`);
            return result.records; 
        } catch (error) {
            Logger.error('Error running query', error);
            throw new Error('Failed to execute query'); 
        } finally {
            session.close(); 
        }
    }
}