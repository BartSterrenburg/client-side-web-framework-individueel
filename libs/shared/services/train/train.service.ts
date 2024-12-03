import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, map } from 'rxjs';
import { Train } from './train.model';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private trains: Train[] = [];
  private trainsSubject = new BehaviorSubject<Train[]>(this.trains);

  private apiUrl = 'http://localhost:3000/api/train';

  constructor(private http: HttpClient) {}

  // GET: Haal de treinen op van de API
  getTrains(): Observable<Train[]> {
    return this.http.get<{ results: Train[] }>(this.apiUrl).pipe(
      map(response => {
        this.trains = response.results;
        this.trainsSubject.next(this.trains);
        return this.trains;
      })
    );
  }

  // POST: Voeg een nieuwe trein toe
  addTrain(train: Train): void {
    const newTrain = { ...train, _id: this.generateUniqueId() };
    this.trains.push(newTrain);
    this.trainsSubject.next(this.trains);
  }

  editTrain(id: string, train: Train): void {
    let index = this.trains.findIndex((t) => t._id == id);
    console.log("index: " + index);
    if (index !== -1) {
      this.trains[index] = train;
      this.trainsSubject.next(this.trains);
    } else {
      console.log("Train not found!");
    }
  }

  deleteTrain(id: string): void {
    const index = this.trains.findIndex(train => train._id === id);
    if (index !== -1) {
      this.trains.splice(index, 1);
      this.trainsSubject.next(this.trains);
    }
  }

  getTrainsAsObservable(): Observable<Train[]> {
    return of(this.trains);
  }

  getTrainById(id: string): Observable<Train | undefined> {
    const train = this.trains.find((train) => train._id === id);
    return of(train);
  }

  private generateUniqueId(): string {
    return (Math.max(...this.trains.map(train => parseInt(train._id || '0', 10)), 0) + 1).toString();
  }
}
