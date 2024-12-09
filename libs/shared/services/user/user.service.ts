import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { IUserInfo, UserRole, UserGender } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../util-env/src/lib/environment'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users: IUserInfo[] = [];
    private usersSubject = new BehaviorSubject<IUserInfo[]>(this.users);

    private apiUrl = `${environment.SERVER_API_URL}/api/user`


    constructor(private http: HttpClient) {}

    addUser(user: IUserInfo): Observable<IUserInfo> {
        const newUser = {
            "name": user.name,
            "password": user.password,
            "emailAddress": user.emailAddress,
            "isActive": user.isActive,
            "profileImgUrl": user.profileImgUrl,
            "role": user.role,
            "gender": user.gender
        };

        return this.http.post<IUserInfo>(`${this.apiUrl}`, newUser).pipe(
            map(response => {
                return response;
            })
        );
    }

    editUser(id: string, user: IUserInfo): Observable<IUserInfo> {
        return this.http.put<IUserInfo>(`${this.apiUrl}/${id}`, user).pipe(
            map(response => {
                return response;
            })
        );
    }

    //GET
    getUsers(): Observable<IUserInfo[]> {
        return this.http.get<{ results: IUserInfo[] }>(this.apiUrl).pipe(
            map(response => {
            this.users = response.results;
            this.usersSubject.next(this.users);
            return this.users;
            })
        );  
    }

    getUserById(id: string): IUserInfo {
        return this.users.filter((user) => user._id == id)[0];
    }


    deleteUser(id: string): Observable<void> {
        console.log(`Deleting user with id: ${id} url: ${this.apiUrl}/${id}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            map(response => {
                return response;
            })
        );
    }
}
