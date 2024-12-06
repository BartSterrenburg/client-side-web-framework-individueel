import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUserInfo } from './../user/user.model';
import { Router } from '@angular/router';
import { environment } from '../../util-env/src/index';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { AlertService } from './../../../frontend/features/src/lib/alert/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUserInfo | null>(null);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((user: IUserInfo | null) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            return of(user); // Valid token checking logic can be added here
          } else {
            console.log('No current user found');
            return of(null);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(email: string, password: string): Observable<IUserInfo | null> {
    console.log(`login at ${environment.SERVER_API_URL}/api/auth/login with ${email} and ${password}`);

    return this.http
      .post<IUserInfo>(
        `${environment.SERVER_API_URL}/api/auth/login`,
        { "emailAddress": email, "password": password },
        { headers: this.headers }
      )
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been logged in');
          return user;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          this.alertService.error(error.error?.message || error.message);
          return of(null);
        })
      );
  }

  register(userData: IUserInfo): Observable<IUserInfo | null> {
    console.log(`register at ${environment.SERVER_API_URL}/api/users`);
    return this.http
      .post<IUserInfo>(`${environment.SERVER_API_URL}/api/users`, userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.alertService.success('You have been registered');
          return user;
        }),
        catchError((error) => {
          console.error('Register error:', error);
          this.alertService.error(error.error?.message || error.message);
          return of(null);
        })
      );
  }

  validateToken(userData: IUserInfo): Observable<IUserInfo | null> {
    const url = `${environment.SERVER_API_URL}/api/auth/profile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      }),
    };

    console.log(`validateToken at ${url}`);
    return this.http.get<IUserInfo>(url, httpOptions).pipe(
      map((response) => {
        console.log('Token is valid');
        return response;
      }),
      catchError((error) => {
        console.error('Validate token Failed:', error);
        this.logout();
        return of(null);
      })
    );
  }

  logout(): void {
    this.router.navigate(['/']).then((success) => {
      if (success) {
        console.log('logout - removing local user info');
        localStorage.removeItem(this.CURRENT_USER);
        this.currentUser$.next(null);
        this.alertService.success('You have been logged out.');
      } else {
        console.log('Navigation failed during logout.');
      }
    });
  }

  getUserFromLocalStorage(): Observable<IUserInfo | null> {
    const localUser = localStorage.getItem(this.CURRENT_USER);
    return of(localUser ? JSON.parse(localUser) as IUserInfo : null);
  }

  private saveUserToLocalStorage(user: IUserInfo): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: IUserInfo | null) => (user ? user._id === itemUserId : false))
    );
  }
}
