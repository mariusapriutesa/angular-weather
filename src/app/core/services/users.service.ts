import { IUser } from './../domain/types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'api/users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  /** GET users from the server */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
    .pipe(
      catchError(this.handleError<IUser[]>('getUsers', []))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUserById(id: number): Observable<IUser> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<IUser>(`getUserById id=${id}`))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: IUser) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<IUser>('addUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser(user: IUser): Observable<any> {
    console.log( `Updating user:`, user );
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<IUser> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<IUser>('deleteUser'))
    );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}