import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IWeatherResult } from 'src/app/core/domain/types';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  title = 'angular-weather';
  private subs: Subscription[] = [];
  weatherResult: IWeatherResult = {};
  private _weatherResultChanged$: any;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    const sub5 =  this.weatherService._weatherResultChanged$.subscribe(
      (result: IWeatherResult) => (this.weatherResult = result)
    );
  }
  ngOnDestroy(): void {
   
    this.subs.forEach((sub) => sub.unsubscribe());//para eliberar memoria
  }
}
