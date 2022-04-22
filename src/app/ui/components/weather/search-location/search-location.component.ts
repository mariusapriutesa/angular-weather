import { WeatherService } from '../../../../core/services/weather.service';
import {
  IFeature,
  ISarchItem,
  IWeatherResult,
} from '../../../../core/domain/types';
import { LocationService } from '../../../../core/services/location.service';
import { Component } from '@angular/core';
import { ISearchResult } from 'src/app/core/domain/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
})
export class SearchLocationComponent {
  private subs: Subscription[] = [];

  selectedItem: ISarchItem | undefined;

  results: ISarchItem[] = [];

  /**
   *
   */
  constructor(
    private service: LocationService,
    private weatherService: WeatherService
  ) {}

  search(text: string) {
    console.log(text);
    const sub4 = this.service.buscarCiudades(text).subscribe(this.observer);
  }

  onItemSelected(event: ISarchItem) {
    if (event && event.value && event.value.center) {
      const [lon, lat] = event.value.center;

      const sub5 = this.weatherService
        .searchWeatherByLatLon(lat, lon)
        .subscribe(this.weatherObserver);
    }
  }

  private weatherObserver = (response: IWeatherResult) => {
    this.weatherService.setWeatherResult(response);
  };

  private observer = (response: ISearchResult) => {
    // const results : string[] = [];
    // for (let r of response?.features as IFeature[]) {
    //   results.push( r.place_name as string );
    // }

    if (response && response.features) {
      console.log(response.features);
      const results: ISarchItem[] = response.features?.map((result) => {
        return { label: result.place_name as string, value: result };
      });

      console.log(results);
      this.results = [...results];
    }
  };
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe()); //para eliberar memoria
  }
}
