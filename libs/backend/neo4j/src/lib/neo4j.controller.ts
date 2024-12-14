import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Neo4JService } from './neo4j.service';

@Controller('neo/train')
export class Neo4JExampleController {
    constructor(private readonly neo4jService: Neo4JService) {}

    @Get('')
    async getAllUsers(): Promise<any> {
        const results = await this.neo4jService.findAll();
        return results;
    }

    @Post('')
    async postAllStations(): Promise<any> {
        const stations: {id: number, name: string, location: string}[] = [
            {id: 1, name: "Gorinchem", location: "Stationsweg 3, 4205 AA Gorinchem"},
            {id: 2, name: "Boven-Hardinxveld", location: "3372 WB Hardinxveld-Giessendam"},
            {id: 3, name: "Hardinxveld-Giessendam", location: "3373 AH Hardinxveld-Giessendam"},
            {id: 4, name: "Haridnxveld-blauwe-zoom", location: "3373 AP Hardinxveld-Giessendam"},
            {id: 5, name: "Sliedrecht", location: "Stationsplein 10, 3364 AM Sliedrecht"},
            {id: 6, name: "Dordrecht", location: "Centrum, 3317 KA Dordrecht"},
            {id: 7, name: "Lage-Zwaluwe", location: "4926 PK Zevenbergschen Hoek"},
            {id: 8, name: "Breda", location: "4815 CE Breda"}
        ];

        for (let i = 0; i < stations.length; i++) {
            this.neo4jService.createStation(stations[i].id, stations[i].name, stations[i].location);
        }
    }

    @Post(":trainId/station/:stationId")
    async coupleTrainToStation(@Param('trainId') trainId: string, @Param('stationId') stationId: string, @Body() body: any): Promise<any> {
        const averagePassingTime = body.info ? Number(body.info) : 0; 

        return this.neo4jService.createTrainStationRelationship(trainId, Number.parseInt(stationId), averagePassingTime);
    }

    @Get(':trainId/stations')
    async getStationsByTrain(@Param('trainId') trainId: string): Promise<any> {
        const stations = await this.neo4jService.getStationsByTrain(trainId);
        return stations;
    }

    @Get('station/:stationId/trains')
    async getTrainsAtStation(@Param('stationId') stationId: string): Promise<any> {
        const trainsAtStation = await this.neo4jService.getTrainsAtStation(stationId);
        return trainsAtStation;
    }
    
}
