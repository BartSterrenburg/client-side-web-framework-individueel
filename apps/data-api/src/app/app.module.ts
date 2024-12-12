import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendFeaturesModule } from '@train-repo/backend/features';
import { Neo4jBackendModule } from '@train-repo/backend/neo4j';
import { UsersModule } from '@train-repo/backend/user';
import { AuthModule } from '@train-repo/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@train-repo/shared/util-env';
import { Logger } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
          }),
        BackendFeaturesModule,
        AuthModule,
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );

                    connection.on('error', (err) => {
                        Logger.error('MongoDB connection error', err);
                    });
                });
                return connection;
            }
        }),
        Neo4jBackendModule,
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
