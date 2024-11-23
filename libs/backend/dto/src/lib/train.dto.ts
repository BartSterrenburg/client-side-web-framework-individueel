import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
    ICreateTrain,
    IUpdateTrain,
    IUpsertTrain,
    IUserIdentity,
    TrainSort
} from '@train-repo/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateTrainDto implements ICreateTrain {
    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    model!: string;

    @IsString()
    @IsOptional()
    sort!: TrainSort;
}

export class UpsertTrainDto implements IUpsertTrain {
    @IsString()
    @IsOptional()
    id!: string;

    @IsString()
    @IsOptional()
    sort!: TrainSort;

    @IsString()
    @IsOptional()
    name!: string;

    @IsString()
    @IsOptional()
    operator!: string;

    @IsString()
    @IsOptional()
    model!: string;

    @IsString()
    @IsOptional()
    capacity!: number;

    @IsString()
    @IsOptional()
    numberOfWagons!: number;

    @IsString()
    @IsOptional()
    maxSpeed!: number;

    @IsString()
    @IsOptional()
    propulsion!: string;

    @IsString()
    @IsOptional()
    length!: number;

    @IsString()
    @IsOptional()
    manufactureYear!: number;

    @IsString()
    @IsOptional()
    manufacturer!: string;

    @IsString()
    @IsOptional()
    weight!: number;

    @IsString()
    @IsOptional()
    energyConsumption!: number;

    @IsString()
    @IsOptional()
    facilities!: string[];
}

export class UpdateTrainDto implements IUpdateTrain {}
