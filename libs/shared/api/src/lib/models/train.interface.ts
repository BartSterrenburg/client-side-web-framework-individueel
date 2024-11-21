import { Id } from './id.type';
import { IUserIdentity } from './user.interface';

export enum TrainSort {
    Sprinter = 'Sprinter',
    Intercity = 'Intercity',
    HighSpeed = 'HighSpeed',
    Freight = 'Freight',
  }

export interface ITrain {
    id: Id,
    sort: TrainSort;
    name: string;
    operator: string;
    model: string;
    capacity: number;
    numberOfWagons: number;
    maxSpeed: number;
    propulsion: string;
    length: number;
    manufactureYear: number;
    manufacturer: string;
    weight: number;
    energyConsumption: number;
    facilities: string[];
}

export type ICreateTrain = Pick<ITrain, 'name' | 'model' | 'sort'>;
export type IUpdateTrain = Partial<Omit<ITrain, 'id'>>;
export type IUpsertTrain = ITrain;
