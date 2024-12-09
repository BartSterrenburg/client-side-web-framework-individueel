import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, map, tap, catchError, throwError, isObservable } from 'rxjs';
import { Train } from './train.model';
import { environment } from './../../util-env/src/lib/environment'
import { AuthService } from 'libs/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private trains: Train[] = [];
  private trainsSubject = new BehaviorSubject<Train[]>(this.trains);

  private apiUrl = `${environment.SERVER_API_URL}/api/train`

  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET: Haal de treinen op van de API
  getTrains(): Observable<Train[]> {
    console.log(this.apiUrl);
    return this.http.get<{ results: Train[] }>(this.apiUrl).pipe(
      map(response => {
        this.trains = response.results;
        this.trainsSubject.next(this.trains);
        return this.trains;
      })
    );
  }

  addTrain(train: Train): Observable<Train> {
    const newTrain = {
      "sort": train.sort,
      "name": train.name,
      "operator": train.operator,
      "model": train.model,
      "capacity": train.capacity,
      "numberOfWagons": train.numberOfWagons,
      "maxSpeed": train.maxSpeed,
      "propulsion": train.propulsion,
      "length": train.length,
      "manufactureYear": train.manufactureYear,
      "manufacturer": train.manufacturer,
      "weight": train.weight,
      "energyConsumption": train.energyConsumption,
      "facilities": train.facilities,
      "owner": this.authService.getCurrentUserId()
    };

    const token = this.authService.getTokenFromLocalStorage();
    if(token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.post<Train>(this.apiUrl, newTrain, {headers}).pipe(
        map(response => {
          return response
        })
      );
    } else {
      this.authService.logout();
      return throwError(() => new Error('No valid token found. User logged out'))
    }
  }

  editTrain(id: string, train: Train): Observable<Train> {
    const newTrain = {
      "sort": train.sort,
      "name": train.name,
      "operator": train.operator,
      "model": train.model,
      "capacity": train.capacity,
      "numberOfWagons": train.numberOfWagons,
      "maxSpeed": train.maxSpeed,
      "propulsion": train.propulsion,
      "length": train.length,
      "manufactureYear": train.manufactureYear,
      "manufacturer": train.manufacturer,
      "weight": train.weight,
      "energyConsumption": train.energyConsumption,
      "facilities": train.facilities
    };

    const token = this.authService.getTokenFromLocalStorage();
    if(token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.put<Train>(`${this.apiUrl}/${id}`, newTrain, {headers}).pipe(
        map(response => {
          return response
        })
      )
    } else {
      return throwError(() => new Error('No valid token found. User logged out'))
    }
  }

  deleteTrain(id: string): Observable<void> {
    console.log(`Deleting train with id: ${id} url: ${this.apiUrl}/${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        return response;
      })
    );
  }
  
  getTrainsAsObservable(): Observable<Train[]> {
    return of(this.trains);
  }

  getTrainById(id: string): Observable<Train | undefined> {
    const train = this.trains.find((train) => train._id === id);
    return of(train);
  }
}
