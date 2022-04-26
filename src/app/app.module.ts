import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { HeaderComponent } from './ui/layout/header/header.component';
import { HTTP_INTERCEPTORS_PROVIDERS } from './core/http';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DirectivesModule } from './core/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    ButtonModule,
    DirectivesModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    
  ],
  providers: [HTTP_INTERCEPTORS_PROVIDERS],//para definir los interceptors
  bootstrap: [AppComponent],
})
export class AppModule {}
