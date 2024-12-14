import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, map, tap, catchError, throwError, isObservable } from 'rxjs';
import { Station } from './station.model';
import { environment } from '../../util-env/src/lib/environment'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private stations: Station[] = [];
  private stationsSubject = new BehaviorSubject<Station[]>(this.stations);

  private apiUrl = `${environment.SERVER_API_URL}/api/neo`

  constructor(private http: HttpClient, private authService: AuthService) {}

  getStationsByTrain(trainId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/train/${trainId}/stations`);
  }

  getTrainsAtStation(stationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/train/station/${stationId}/trains`);
  }
}
