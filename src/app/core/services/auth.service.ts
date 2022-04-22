import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogingRequest, IUser } from '../domain/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.backendServer}/auth`; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public authenticate(data: ILogingRequest): Observable<IUser> {
    return this.http.post<IUser>(`${this.authUrl}/login`, data).pipe(
      tap((userDate: IUser) => {
        if (userDate && userDate.id) {
          this.setAuthId(data.username, data.password);
          this.setLoggedUser(userDate);
        } else {
          this.disconect();
        }
      })
    );
    
  }
  public isAuthenticated():boolean{
const data= this.getLoggedUser();
return data != null;

  }

  public setAuthId(username: string, password: string): void {
    const token = window.btoa(`${username}:${password}`);// te genera el token
    sessionStorage.setItem('auth-id', token);
  }

  public setLoggedUser(data: IUser): void {
    const userStr = JSON.stringify(data);
    sessionStorage.setItem('user-data', userStr);
  }

  public getAuthId(): string | null {
    return sessionStorage.getItem('auth-id');
  }

  public getLoggedUser(): IUser | null {
    const userStr = sessionStorage.getItem('user-data');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
  public disconect(): void {
    sessionStorage.removeItem('auth-id');
    sessionStorage.removeItem('user-data');
  }
}
