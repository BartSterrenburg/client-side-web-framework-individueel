import { Module } from '@nestjs/common';
import { BackendFeaturesModule } from '@train-repo/backend/features';
import { UsersModule } from '@train-repo/backend/user';
import { AuthModule } from '@train-repo/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@train-repo/shared/util-env';
import { Logger } from '@nestjs/common';

@Module({
    imports: [
        BackendFeaturesModule,
        AuthModule,
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    // console.log('is connected');
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );
                });
                connection._events.connected();
                return connection;
            }
        }),
        UsersModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
