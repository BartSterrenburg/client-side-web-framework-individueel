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

    addUser(user: IUserInfo): void {
        const newUser = { ...user, _id: this.generateUniqueId() };
        this.users.push(newUser);
        this.usersSubject.next(this.users);
    }

    editUser(id: string, user: IUserInfo): Observable<IUserInfo> {
        return this.http.put<IUserInfo>(`${this.apiUrl}/${id}`, user).pipe(
          map(updatedUser => {
            const index = this.users.findIndex(u => u._id === id);
            if (index !== -1) {
              this.users[index] = updatedUser;
              this.usersSubject.next(this.users);
            }
            return updatedUser;
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
        console.log(`Trying to delete user with id: ${id}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            map(() => {
                const index = this.users.findIndex(user => user._id === id);
                if (index !== -1) {
                    this.users.splice(index, 1);
                    this.usersSubject.next(this.users);
                }
            }),
            catchError(error => {
                console.error('Error during delete:', error);
                return throwError(() => new Error('Error during delete operation.'));
            })
        );
    }
    

    private generateUniqueId(): string {
        return (Math.max(...this.users.map(user => parseInt(user._id || '0', 10)), 0) + 1).toString();
    }
}
