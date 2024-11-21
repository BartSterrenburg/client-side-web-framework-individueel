import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IUserInfo, UserRole } from './../../../../../shared/api/src/lib/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ApiResponse } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users?: IUserInfo[] = [];

  constructor(private http: HttpClient) {}

  getUsersAsync(): Observable<IUserInfo[]> {
    console.log('getUsers aangeroepen');
    return this.http.get<ApiResponse<any>>(environment.dataApiUrl + '/api/user')
    .pipe(map((response) => response.results));
  }
}
