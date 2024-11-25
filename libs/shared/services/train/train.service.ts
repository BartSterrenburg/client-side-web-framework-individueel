import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Train, TrainSort } from './train.model';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private trains: Train[] = [
    {
      id: "1",
      sort: TrainSort.Intercity,
      name: 'Intercity 1000',
      operator: 'NS',
      model: 'Bombardier Zefiro',
      capacity: 600,
      numberOfWagons: 8,
      maxSpeed: 200,
      propulsion: 'Electric',
      length: 200,
      manufactureYear: 2010,
      manufacturer: 'Bombardier',
      weight: 400,
      energyConsumption: 1.5,
      facilities: ['WiFi', 'Toilets', 'Power sockets'],
    },
    {
      id: "2",
      sort: TrainSort.Sprinter,
      name: 'Sprinter 200',
      operator: 'NS',
      model: 'Stadler FLIRT',
      capacity: 200,
      numberOfWagons: 4,
      maxSpeed: 120,
      propulsion: 'Electric',
      length: 100,
      manufactureYear: 2015,
      manufacturer: 'Stadler',
      weight: 150,
      energyConsumption: 1.2,
      facilities: ['Toilets'],
    },
    {
      id: "3",
      sort: TrainSort.HighSpeed,
      name: 'Thalys 3000',
      operator: 'Thalys',
      model: 'Alstom TGV',
      capacity: 500,
      numberOfWagons: 10,
      maxSpeed: 300,
      propulsion: 'Electric',
      length: 300,
      manufactureYear: 2012,
      manufacturer: 'Alstom',
      weight: 600,
      energyConsumption: 2.0,
      facilities: ['WiFi', 'Power sockets', 'Restaurant'],
    },
    {
      id: "4",
      sort: TrainSort.Freight,
      name: 'Freight 4000',
      operator: 'DB Cargo',
      model: 'Siemens Vectron',
      capacity: 1000,
      numberOfWagons: 30,
      maxSpeed: 140,
      propulsion: 'Electric/Diesel',
      length: 600,
      manufactureYear: 2018,
      manufacturer: 'Siemens',
      weight: 1200,
      energyConsumption: 2.5,
      facilities: ['None'],
    },
    {
      id: "5",
      sort: TrainSort.Intercity,
      name: 'Intercity 1500',
      operator: 'NS',
      model: 'Siemens ICE 3',
      capacity: 500,
      numberOfWagons: 8,
      maxSpeed: 300,
      propulsion: 'Electric',
      length: 250,
      manufactureYear: 2016,
      manufacturer: 'Siemens',
      weight: 500,
      energyConsumption: 1.8,
      facilities: ['WiFi', 'Toilets', 'Power sockets'],
    },
    {
      id: "6",
      sort: TrainSort.Sprinter,
      name: 'Sprinter 300',
      operator: 'NS',
      model: 'Stadler FLIRT',
      capacity: 180,
      numberOfWagons: 4,
      maxSpeed: 100,
      propulsion: 'Electric',
      length: 80,
      manufactureYear: 2016,
      manufacturer: 'Stadler',
      weight: 120,
      energyConsumption: 1.1,
      facilities: ['Toilets'],
    },
    {
      id: "7",
      sort: TrainSort.HighSpeed,
      name: 'Eurostar 5000',
      operator: 'Eurostar',
      model: 'Alstom Eurostar',
      capacity: 750,
      numberOfWagons: 12,
      maxSpeed: 320,
      propulsion: 'Electric',
      length: 400,
      manufactureYear: 2014,
      manufacturer: 'Alstom',
      weight: 700,
      energyConsumption: 2.2,
      facilities: ['WiFi', 'Power sockets', 'Toilets', 'Catering'],
    },
    {
      id: "8",
      sort: TrainSort.Freight,
      name: 'Freight 5000',
      operator: 'SBB Cargo',
      model: 'Bombardier Traxx',
      capacity: 1500,
      numberOfWagons: 40,
      maxSpeed: 120,
      propulsion: 'Electric/Diesel',
      length: 700,
      manufactureYear: 2019,
      manufacturer: 'Bombardier',
      weight: 1500,
      energyConsumption: 3.0,
      facilities: ['None'],
    },
    {
      id: "9",
      sort: TrainSort.Intercity,
      name: 'Intercity 2000',
      operator: 'NS',
      model: 'Alstom Coradia Lint',
      capacity: 400,
      numberOfWagons: 6,
      maxSpeed: 160,
      propulsion: 'Diesel',
      length: 150,
      manufactureYear: 2020,
      manufacturer: 'Alstom',
      weight: 300,
      energyConsumption: 1.3,
      facilities: ['WiFi', 'Power sockets'],
    }
  ];
  private trainsSubject = new BehaviorSubject<Train[]>(this.trains);



  constructor() {
    console.log('Service constructor aangeroepen');
  }

  //GET
  getTrains(): Observable<Train[]> {
    return this.trainsSubject.asObservable();
  }

  //POST
  addTrain(train: Train): void {
    this.trains.push(train);
  }

  editTrain(): void {
    // TO DO
  }

  deleteTrain(id: string): void {
    const index = this.trains.findIndex(train => train.id === id);
    if (index !== -1) {
      this.trains.splice(index, 1);
      this.trainsSubject.next(this.trains);
    }
  }

  getTrainsAsObservable(): Observable<Train[]> {
    console.log('getUsersAsObservable aangeroepen');
    return of(this.trains);
  }

  getTrainById(id: string): Train {
    return this.trains.filter((train) => train.id === id)[0];
  }
}
