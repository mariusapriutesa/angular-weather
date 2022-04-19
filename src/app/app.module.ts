import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SearchLocationComponent } from './ui/components/search-location/search-location.component';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherDisplayComponent } from './ui/components/weather-display/weather-display.component';
import { TempPipe } from './core/pipes/temp.pipe';
import { UsersListComponent } from './ui/components/users-list/users-list.component';
import { WeatherComponent } from './ui/components/weather/weather.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { UserDetailComponent } from './ui/components/user-detail/user-detail.component';
import { UserFormComponent } from './ui/components/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchLocationComponent,
    WeatherDisplayComponent,
    TempPipe,
    UsersListComponent,
    WeatherComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AutoCompleteModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }