import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PaginatorModule } from 'primeng/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes=[
//data es para espicificar parametos de la ruta
  { path: '', component: UsersListComponent },
  { path: ':id', component: UserDetailComponent },
  { path: 'form/create', component: UserFormComponent , canActivate:[RoleGuard], data: {role:'ROLE_ADMIN'}},
  { path: 'form/update/:id', component: UserFormComponent ,canActivate:[RoleGuard], data: {role:['ROLE_ADMIN','ROLE_EDITOR']}}
];

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
    UserFormComponent
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CalendarModule,
    InputSwitchModule,
    DirectivesModule,
    PaginatorModule,
    NgxPaginationModule
  ],
  
  exports:[
    UsersListComponent,
    UserDetailComponent,
    UserFormComponent

  ]
})
export class UsersModule { }
