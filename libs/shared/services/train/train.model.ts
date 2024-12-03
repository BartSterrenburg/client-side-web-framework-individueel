import { Id } from './../id.model';

export enum TrainSort {
  Sprinter = 'Sprinter',
  Intercity = 'Intercity',
  HighSpeed = 'HighSpeed',
  Freight = 'Freight',
  Unkown = 'Unknown'
}

export class Train {
  _id: Id = "0";
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

  constructor(
    _id: Id,
    sort: TrainSort,
    name: string,
    operator: string,
    model: string,
    capacity: number,
    numberOfWagons: number,
    maxSpeed: number,
    propulsion: string,
    length: number,
    manufactureYear: number,
    manufacturer: string,
    weight: number,
    energyConsumption: number,
    facilities: string[],
  ) {
    this._id = _id;
    this.sort = sort;
    this.name = name;
    this.operator = operator;
    this.model = model;
    this.capacity = capacity;
    this.numberOfWagons = numberOfWagons;
    this.maxSpeed = maxSpeed;
    this.propulsion = propulsion;
    this.length = length;
    this.manufactureYear = manufactureYear;
    this.manufacturer = manufacturer;
    this.weight = weight;
    this.energyConsumption = energyConsumption;
    this.facilities = facilities;
  }
}
