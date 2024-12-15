import { Injectable, Logger } from '@nestjs/common';
import { neo4JConnection } from '../neo4j.connection'
import { Observable } from 'rxjs';

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
        const parameters = { id: id, name: name, sort: sort, model: model, operator: operator };
        return await this.connection.runQuery(query, parameters);
    }

    async createStation(id: number, name: string, location: string) {
        const query = `
            CREATE (s:Station {
                id: toInteger($id),
                naam: toString($name),
                locatie: toString($location)
            })
            RETURN s
        `;
        this.logger.log(`Running Query: ${query}`);
    
        const parameters = {
            id: id,
            name: name,
            location: location
        };
    
        return await this.connection.runQuery(query, parameters);
    }
    

    async createTrainStationRelationship(trainId: string, stationId: number, averagePassingTime: number) {
        const query = `
            MATCH (t:Trein {id: $trainId}), (s:Station {id: $stationId})
            CREATE (t)-[r1:PASSAGEERT {avgPassTime: $averagePassingTime}]->(s)
            CREATE (s)-[r2:PASSAGEERT {avgPassTime: $averagePassingTime}]->(t)
            RETURN r1, r2
        `;

        const parameters = { trainId: trainId, stationId: stationId, averagePassingTime: averagePassingTime };
        return await this.connection.runQuery(query, parameters);
    }
    

    async getStationsByTrain(trainId: string): Promise<Observable<any>> {
        this.logger.log(`Getting stations for train with ID: ${trainId}`);
        
        const query = `
            MATCH (t:Trein {id: $trainId})-[:PASSAGEERT]->(s:Station)
            RETURN s.id AS stationId, s.naam AS stationName, s.locatie AS stationLocation
        `;
        const parameters = { trainId: trainId };
        const results = await this.connection.runQuery(query, parameters);
    
        console.log('Neo4j results:', results);
    
        const stations = results.map((record: any) => {
            return {
                id: record._fields[0],           // stationId
                name: record._fields[1],         // stationName
                location: record._fields[2],     // stationLocation
            };
        });
    
        return stations;
    }


    async getTrainsAtStation(stationIdString: string): Promise<Observable<any>> {
        this.logger.log(`Getting trains for station with ID: ${stationIdString}`);
    
        const query = `
            MATCH (s:Station {id: $stationId})-[:PASSAGEERT]->(t:Trein)
            RETURN t.id AS _id, t.model AS model, t.naam AS name, t.operator AS operator, t.sort AS sort
        `;
    
        const stationId = parseInt(stationIdString);

        const parameters = { stationId: stationId };
        const results = await this.connection.runQuery(query, parameters);
    
        console.log('Neo4j results:', results);
    
        const trains = results.map((record: any) => {
            return {
                _id: record._fields[0],           // t.id
                model: record._fields[1],         // t.model
                name: record._fields[2],          // t.naam
                operator: record._fields[3],      // t.operator
                sort: record._fields[4]           // t.sort
            };
        });
    
        return trains;
    }
    
}



