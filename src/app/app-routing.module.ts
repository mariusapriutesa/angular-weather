import { UserFormComponent } from './ui/components/user-form/user-form.component';
import { WeatherComponent } from './ui/components/weather/weather.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './ui/components/users-list/users-list.component';
import { UserDetailComponent } from './ui/components/user-detail/user-detail.component';


const rutas: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'user/create', component: UserFormComponent },
  { path: 'user/update/:id', component: UserFormComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }