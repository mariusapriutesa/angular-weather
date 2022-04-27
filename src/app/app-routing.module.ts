import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';



const rutas: Routes = [
  {path: '', redirectTo: '/weather', pathMatch: 'full' },
  {path: 'weather' , loadChildren:() => import('./ui/components/weather/weather.module').then(m => m.WeatherModule), canLoad:[AuthGuard]},
  {path: 'login' , loadChildren:() => import('./ui/components/login/login.module').then(m => m.LoginModule)},
  {path: 'users' , loadChildren:() => import('./ui/components/users/users.module').then(m => m.UsersModule), canLoad:[AuthGuard]}
  
  /*
  */
];


@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }