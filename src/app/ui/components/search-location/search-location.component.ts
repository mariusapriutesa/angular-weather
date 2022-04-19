import { Component } from '@angular/core';
import {
  IFeature,
  IMain,
  ISarchItem,
  ISearchResult,
  IWeatherResult,
} from 'src/app/core/domain/types';
import { LocationService } from 'src/app/core/services/location.service';
import { WeatherService } from './../../../core/services/weather.service';
@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.Component.html',
})
export class SearchLocationComponent {
  //text: string = '';
  selectedItem: ISarchItem | undefined; //no se que hace

  results: ISarchItem[] = []; //es un array
  //results2: IMain[] = this.results[];

  /**
   *
   */
  constructor(
    private services: LocationService, //llama la clase LocactionServices , que es un url para el api
    private weatherService: WeatherService //llama la clase WeatherService , que es un url para el api
  ) { }

  search(text: String) {
    console.log(text);
    this.services.buscarCiudades(text).subscribe(this.observer); //apelurile din Angular sunt folosite rxjsintern și, pentru a putea folosi
    //oricare dintre ele, trebuie să utilizați numele metodei, de exemplu get, și apoi să apelați subscribe pe ea, deoarece getreturnează și Observable.
  }

  onItemSelected(event: ISarchItem) {
    // console.log(event.value.center);
    if (event && event.value && event.value.center) {
      const [lon, lat] = event.value.center;

      this.weatherService
        .searchWeatherByLatLon(lat, lon)
        .subscribe((response: IWeatherResult) => {
          //   this.weatherResult = response;
          this.weatherService.setWeatherResult(response);
        });
    }
  }

  private observer = (response: ISearchResult) => {
    //una funccion que manda el console.log(result)
    /*const results: string[] = [];
    for (let r of response?.features as [IFeature]) {
      //llamamos la lista con sugerencias
      results.push(r.place_name as string);
    }*/

    if (response && response.features) {
      console.log(response.features);
      const results: ISarchItem[] = response.features?.map((results) => {
        return { label: results.place_name as string, value: results };
      });

      console.log(results);
      this.results = [...results]; //copia los valores de este areglo para otro operador=sptig
    }
  };
}
