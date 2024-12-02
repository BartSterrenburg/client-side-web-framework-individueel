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

    addUser(user: IUserInfo): void {
        const newUser = { ...user, _id: this.generateUniqueId() };
        this.users.push(newUser);
        this.usersSubject.next(this.users);
    }

    editUser(id: string, user: IUserInfo): void {
        const index = this.users.findIndex((u) => u._id == id);
        if (index) {
            this.users[index] = user;
            this.usersSubject.next(this.users);
        }
    }

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

    private generateUniqueId(): string {
        return (Math.max(...this.users.map(user => parseInt(user._id || '0', 10)), 0) + 1).toString();
    }
}
