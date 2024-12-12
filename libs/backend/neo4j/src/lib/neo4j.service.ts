import { Injectable, Logger } from '@nestjs/common';
import { neo4JConnection } from '../neo4j.connection'

@Injectable()
export class Neo4JService {
    private readonly logger: Logger = new Logger(Neo4JService.name);

    constructor(private connection: neo4JConnection) {}

    async findAll(): Promise<any> {
        this.logger.log('findAll users');
        const results = await this.connection.runQuery(
            `MATCH people=()-[:WorksIn]->(t:Team {name:'Informatica'}) RETURN people;`
        );
        const users = results.map(
            (record: any) => record._fields[0].start.properties
        );
        return users;
    }

      // Maak een trein-node in Neo4j
    async createTrain(id: string, name: string, sort: string, model: string, operator: string) {
        const query = `
            CREATE (t:Trein {id: $id, naam: $name, sort: $sort, model: $model, operator: $operator})
            RETURN t
        `;
        const parameters = { id, name, sort, model, operator };
        return await this.connection.runQuery(query, parameters);
    }

    // Maak een station-node in Neo4j
    async createStation(id: number, name: string, location: string) {
        const query = `
            CREATE (s:Station {id: $id, naam: $name, locatie: $location})
            RETURN s
        `;
        const parameters = { id, name, location };
        return await this.connection.runQuery(query, parameters);
    }

    async createTrainStationRelationship(trainId: string, stationId: number, averagePassingTime: number) {
        const query = `
            MATCH (t:Trein {id: $trainId}), (s:Station {id: $stationId})
            CREATE (t)-[r:PASSAGEERT {avgPassTime: $averagePassingTime}]->(s)
            RETURN r
        `;
        const parameters = { trainId, stationId, averagePassingTime };
        return await this.connection.runQuery(query, parameters);
    }
    
}



