import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchLocationComponent } from './search-location/search-location.component';
import { WeatherComponent } from './weather.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { RouterModule, Routes } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { TempPipe } from 'src/app/core/pipes/temp.pipe';

const routes: Routes=[

  { path: '', component: WeatherComponent }
 
];


@NgModule({
  declarations: [
    SearchLocationComponent,
    WeatherDisplayComponent,
    WeatherComponent,
    TempPipe

  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class WeatherModule { }
