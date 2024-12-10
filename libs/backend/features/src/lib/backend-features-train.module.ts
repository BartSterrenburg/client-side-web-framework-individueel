import { Module } from '@nestjs/common';
import { TrainController } from './train/train.controller';
import { TrainService } from './train/train.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserModel, UserSchema } from '@train-repo/backend/user';
import { Train as TrainModel, TrainSchema } from './train/train.schema';
import { Post as PostModel, PostSchema } from './post/post.schema'
import { AuthModule } from '@train-repo/backend/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TrainModel.name, schema: TrainSchema },
            { name: UserModel.name, schema: UserSchema },
            { name: PostModel.name, schema:PostSchema}
        ]),
        JwtModule,
        AuthModule
    ],
    controllers: [TrainController, PostController],
    providers: [TrainService, PostService],
    exports: [TrainService, PostService]
})
export class BackendFeaturesModule {}
