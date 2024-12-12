import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JExampleController } from './neo4j.controller';
import { Neo4JService } from './neo4j.service';
import { neo4JConnection } from './../neo4j.connection'

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JExampleController],
    providers: [Neo4JService, neo4JConnection],
    exports: [Neo4JService]
})
export class Neo4jBackendModule {}
