import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  user:IUser| undefined;

  constructor(private service: UsersService , private route: ActivatedRoute) {

    this.userForm = new FormGroup({
      'id': new FormControl(this.user?.id),
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null),
      'enabled': new FormControl(true),
      'createdAt': new FormControl(null, Validators.required)
    });

   }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id']; //obtenemos datos de la url
    if (userId) {
      this.service.getUserById(userId).subscribe(resp => this.user = resp);
    }
  }


  onFormSubmit(): void {
    if (this.userForm.invalid) {
      console.log( this.userForm.get('email')?.errors );
      throw Error('Formulario inválido');
    }


    const userData: IUser = this.userForm.value;

    const userId = this.route.snapshot.params['id'];
    if (userId && this.user?.id != undefined) {
      userData.id = this.user?.id;
      this.service.updateUser(userData).subscribe(console.log);
    } else {
      this.service.addUser(userData).subscribe(console.log);
    }
  }
  }


