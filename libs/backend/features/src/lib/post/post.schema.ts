import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IPost, IComment } from '@train-repo/shared/api';
import { IsMongoId } from 'class-validator';

export type PostDocument = Post & Document;

@Schema()
export class Post implements IPost {
    @IsMongoId()
    id!: string;
    @Prop({ required: false })
    description!: string;
    @Prop({ required: false })
    picture!: string;
    @Prop({ required: false })
    isCommentable!: boolean;
    @Prop({ required: false })
    isActive!: boolean;
    @Prop({ required: false })
    createdAt!: Date;
    @Prop({ required: false })
    updatedAt!: Date;
    @Prop({ type: [{ content: String, createdAt: Date }] })
    comments!: IComment[];
    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    owner!: MongooseSchema.Types.ObjectId;
    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'Train' })
    train!: MongooseSchema.Types.ObjectId;

}

export const PostSchema = SchemaFactory.createForClass(Post);
