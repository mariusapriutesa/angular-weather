import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IWeatherResult } from 'src/app/core/domain/types';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {

  @Input()data : IWeatherResult={};
  
  constructor() { }

  ngOnInit(): void {
  }

}
