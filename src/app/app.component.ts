import { Component, OnInit } from '@angular/core';
import { IWeatherResult } from './core/domain/types';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-weather';

  weatherResult: IWeatherResult = {};
  weatherResult1: IWeatherResult = {};
  weatherResult2: IWeatherResult = {};

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.weatherService._weatherResultChanged$.subscribe(
      (result) => (this.weatherResult = result)
    );
    this.weatherService._weatherResultChanged$.subscribe(
      (result) => (this.weatherResult1 = result)
    );
    this.weatherService._weatherResultChanged$.subscribe(
      (result) => (this.weatherResult2 = result)
    );
  }
}
