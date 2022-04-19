import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IWeatherResult } from '../domain/types';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherPoint = 'https://api.openweathermap.org/data/2.5/weather';

  private _weatherResult = new Subject<IWeatherResult>();
  public _weatherResultChanged$ = this._weatherResult.asObservable(); //se pone detras$ para specificar que es un obs

  constructor(private http: HttpClient) {}

  public searchWeatherByLatLon(
    lat: number,
    lon: number,
    units = 'metric'
  ): Observable<IWeatherResult> {
    //dos parametros
    const url = `${this.weatherPoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${environment.weatherPointToken}`;

    return this.http.get(url);
  }
  public setWeatherResult(data: IWeatherResult): void {
    this._weatherResult.next(data);
  }
}
