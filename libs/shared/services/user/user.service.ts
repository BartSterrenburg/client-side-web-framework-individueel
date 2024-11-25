import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
    IUserInfo,
    UserRole,
    UserGender
} from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@train-repo/shared/util-env';
import { ApiResponse } from '@train-repo/shared/api';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly users: IUserInfo[] = [
        {
            _id: "1",
            name: "Bart",
            emailAddress: "sb.sterrenburg@student.avans.nl",
            role: UserRole.Unknown,
            gender: UserGender.Unknown,
            password: "secret",
            isActive: true,
            profileImgUrl: "url"
        },
        {
            _id: "2",
            name: "Maureen",
            emailAddress: "lm.sterrenburg@student.avans.nl",
            role: UserRole.Unknown,
            gender: UserGender.Unknown,
            password: "secret",
            isActive: true,
            profileImgUrl: "url"
        }
    ];

    constructor(private http: HttpClient) {}

    getUsersAsObservable(): Observable<IUserInfo[]> {
        console.log('getUsersAsObservable aangeroepen');
        return of(this.users);
      }
}
