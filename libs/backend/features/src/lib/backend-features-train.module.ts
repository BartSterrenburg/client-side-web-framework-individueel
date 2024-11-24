import { Module } from '@nestjs/common';
import { TrainController } from './train/train.controller';
import { TrainService } from './train/train.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserModel, UserSchema } from '@train-repo/backend/user';
import { Train as TrainModel, TrainSchema } from './train/train.schema';
import { AuthModule } from '@train-repo/backend/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TrainModel.name, schema: TrainSchema },
            { name: UserModel.name, schema: UserSchema }
        ]),
        JwtModule,
        AuthModule
    ],
    controllers: [TrainController],
    providers: [TrainService],
    exports: [TrainService]
})
export class BackendFeaturesModule {}
