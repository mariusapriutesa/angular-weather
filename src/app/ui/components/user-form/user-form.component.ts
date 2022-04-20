import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  user:IUser| undefined;

  constructor(private service: UsersService , private route: ActivatedRoute) {
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    this.userForm = new FormGroup({
      'id': new FormControl(this.user?.id),
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.pattern(emailPattern)]),
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
      Swal.fire({
        title: 'Quieres actualizar el usuario?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        denyButtonText: `No actualizar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.updateUser(userData).subscribe(console.log);
          Swal.fire('El usuario ha sido guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no han sido guardados', '', 'info')
        }
      })
      
    } else {
      Swal.fire({
        title: 'Quieres crear el nuevo usuario?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'SI',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.service.addUser(userData).subscribe(console.log);
          Swal.fire('El usuario ha sido guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no han sido guardados', '', 'info')
        }
      })
      
    }
  }
  }


