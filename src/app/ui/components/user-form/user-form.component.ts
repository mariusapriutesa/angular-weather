import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(private service: UsersService) {

    this.userForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null),
      'enabled': new FormControl(true),
      'createdAt': new FormControl(null, Validators.required)
    });

   }

  ngOnInit(): void {
  }


  onFormSubmit(): void {
    if (this.userForm.invalid) {
      console.log( this.userForm.get('email')?.errors );
      throw Error('Formulario inválido');
    }


    const userData: IUser = this.userForm.value;

    this.service.addUser( userData ).subscribe( console.log );
  }


}