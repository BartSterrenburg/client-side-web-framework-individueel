import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, map, tap, catchError, throwError, isObservable } from 'rxjs';
import { Post } from './post.model';
import { environment } from '../../util-env/src/lib/environment'
import { AuthService } from './../../../shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsSubject = new BehaviorSubject<Post[]>(this.posts);

  private apiUrl = `${environment.SERVER_API_URL}/api/trainpost`

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPostsFromTrain(trainId: string): Observable<Post[]> {
    console.log(`${this.apiUrl}/train/${trainId}`);
    return this.http.get<{ results: Post[] }>(`${this.apiUrl}/train/${trainId}`).pipe(
      map(response => {
        this.posts = response.results;
        this.postsSubject.next(this.posts);
        return this.posts;
      })
    );
  }

  addTrain(post: Post): Observable<Post> {
    const newPost = {
      "description": post.description,
      "picture": post.picture,
      "isCommentable": post.isCommentable,
      "isActive": post.isActive,
      "createdAt": Date.now(),
      "updatedAt": Date.now(),
      "owner": this.authService.getCurrentUserId(),
      "train": post.train
    };

    const token = this.authService.getTokenFromLocalStorage();
    if(token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      return this.http.post<Post>(this.apiUrl, newPost, {headers}).pipe(
        map(response => {
          return response
        })
      );
    } else {
      this.authService.logout();
      return throwError(() => new Error('No valid token found. User logged out'))
    }
  }

  // editTrain(id: string, train: Train): Observable<Train> {
  //   const newTrain = {
  //     "sort": train.sort,
  //     "name": train.name,
  //     "operator": train.operator,
  //     "model": train.model,
  //     "capacity": train.capacity,
  //     "numberOfWagons": train.numberOfWagons,
  //     "maxSpeed": train.maxSpeed,
  //     "propulsion": train.propulsion,
  //     "length": train.length,
  //     "manufactureYear": train.manufactureYear,
  //     "manufacturer": train.manufacturer,
  //     "weight": train.weight,
  //     "energyConsumption": train.energyConsumption,
  //     "facilities": train.facilities
  //   };

  //   const token = this.authService.getTokenFromLocalStorage();
  //   if(token) {
  //     const headers = new HttpHeaders({
  //       'Authorization': `Bearer ${token}`
  //     });

  //     return this.http.put<Train>(`${this.apiUrl}/${id}`, newTrain, {headers}).pipe(
  //       map(response => {
  //         return response
  //       })
  //     )
  //   } else {
  //     return throwError(() => new Error('No valid token found. User logged out'))
  //   }
  // }

  // deleteTrain(id: string): Observable<void> {
  //   console.log(`Deleting train with id: ${id} url: ${this.apiUrl}/${id}`);
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
  //     map(response => {
  //       return response;
  //     })
  //   );
  // }
  
  // getTrainsAsObservable(): Observable<Train[]> {
  //   return of(this.trains);
  // }

  getPostById(id: string): Observable<Post | undefined> {
    const post = this.posts.find((post) => post._id === id);
    return of(post);
  }
}
