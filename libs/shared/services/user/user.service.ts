import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUserInfo, UserRole, UserGender } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users: IUserInfo[] = [
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
    private usersSubject = new BehaviorSubject<IUserInfo[]>(this.users);

    constructor() {}


  //GET
  getUsers(): Observable<IUserInfo[]> {
    return this.usersSubject.asObservable();
  }

    getUserById(id: string): IUserInfo {
        return this.users.filter((user) => user._id == id)[0];
    }
    deleteUser(id: string): void {
        const index = this.users.findIndex(user => user._id == id);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.usersSubject.next(this.users);
        }
    }

    getUsersAsObservable(): Observable<IUserInfo[]> {
        return of(this.users);
    }
}
