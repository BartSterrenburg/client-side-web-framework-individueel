import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TrainSort, IUserInfo } from '@train-repo/shared/api';
import { ITrain } from '@train-repo/shared/api';
import { IsMongoId } from 'class-validator';

export type TrainDocument = Train & Document;

@Schema()
export class Train implements ITrain {
    @IsMongoId()
    id!: string;
    @Prop({ required: true })
    name!: string;
    @Prop({ required: false })
    operator!: string;
    @Prop({ required: false })
    model!: string;
    @Prop({ required: false })
    capacity!: number;
    @Prop({ required: false })
    numberOfWagons!: number;
    @Prop({ required: false })
    maxSpeed!: number;
    @Prop({ required: false })
    propulsion!: string;
    @Prop({ required: false })
    length!: number;
    @Prop({ required: false })
    manufactureYear!: number;
    @Prop({ required: false })
    manufacturer!: string;
    @Prop({ required: false })
    weight!: number;
    @Prop({ required: false })
    energyConsumption!: number;
    @Prop({ required: true, type: Object })
    sort!: TrainSort;
    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    owner!: IUserInfo;
    facilities!: string[];
}

export const TrainSchema = SchemaFactory.createForClass(Train);
