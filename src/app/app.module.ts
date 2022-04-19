import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchLocationComponent } from './ui/components/search-location/search-location.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDisplayComponent } from './ui/components/weather-display/weather-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchLocationComponent,
    WeatherDisplayComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    HttpClientModule,
    BrowserAnimationsModule,//para que te salta sugerencias en la bara de busquedas
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
