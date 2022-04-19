import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISearchResult } from '../domain/types';

//injectable = para que no tener que llamar la clase
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private mapBoxEndpoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places';//copy
 

  constructor(private http: HttpClient) {}

  public buscarCiudades(query: String): Observable<ISearchResult> {//dos parametros
    const url = `${this.mapBoxEndpoint}/${query}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${environment.mapboxToken}`;
    this.http.get(url);

    return this.http.get(url);
  }
  
}
