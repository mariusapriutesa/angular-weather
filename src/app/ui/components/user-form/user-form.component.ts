import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  userForm: FormGroup | undefined;
  userId: number | undefined;

  constructor(private service: UsersService,
              private route: ActivatedRoute,
              private router: Router) {

      this.buildFormData(null);
   }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    if (this.userId) {
      this.service.getUserById( this.userId ).subscribe( user => {
        console.log(user);
        this.buildFormData(user);
      } );
    }
  }


  onFormSubmit(): void {
    if (this.userForm?.invalid) {
      console.log( this.userForm.get('email')?.errors );
      throw Error('Formulario inválido');
    }

    const userData: IUser = this.userForm?.value;

    if ( this.userId ) {

      userData.id = this.userId;
      this.service.updateUser( userData ).subscribe( resp => {
        Swal.fire(
          'Updated!',
          `${userData.name} has been updated.`,
          'success'
        ).finally( () =>  this.router.navigate(['/users']).finally());
      } );

    } else {

      this.service.addUser( userData ).subscribe( resp => {
        if ( resp.id ) {
          Swal.fire(
            'Created!',
            `${resp.name} has been created.`,
            'success'
          ).finally( () =>  this.router.navigate(['/users']).finally());
        }
      } );

    }


  }

  private buildFormData(userdata: IUser | null): void {
    this.userForm = new FormGroup({
      'name': new FormControl(userdata?.name, Validators.required),
      'email': new FormControl(userdata?.email, [Validators.required, Validators.email]),
      'password': new FormControl(userdata?.password),
      'enabled': new FormControl(userdata?.enabled || false),
      'createdAt': new FormControl(userdata?.createdAt, Validators.required)
    });
  }

  ngOnDestroy(): void {
      this.userId = undefined;
  }


}