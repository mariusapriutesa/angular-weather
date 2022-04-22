import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  
  userForm: FormGroup | undefined;
  userId: number | undefined;
  private subs: Subscription[] = [];

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildFormData(null);
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    if (this.userId) {
      const sub1 = this.service.getUserById(this.userId).subscribe((user) => {
        console.log(user);
        this.buildFormData(user);
      });
      this.subs.push(sub1);
    }
  }

  onFormSubmit(): void {
    if (this.userForm?.invalid) {
      console.log(this.userForm.get('email')?.errors);
      throw Error('Formulario inválido');
    }

    const userData: IUser = this.userForm?.value;

    if (this.userId) {
      userData.id = this.userId;
     //--------------------------------updateUser-------------------------------------
      const sub2 = this.service.updateUser(userData).subscribe((resp) => {
        Swal.fire(
          'Updated!',
          `${userData.name} has been updated.`,
          'success'
        ).finally(() => this.router.navigate(['/users']).finally());
      });
      this.subs.push(sub2);
    } else {
      //-------------------------addUser----------------------------------------
      const sub3 = this.service.addUser(userData).subscribe((resp) => {
        if (resp.id) {
          Swal.fire(
            'Created!',
            `${resp.name} has been created.`,
            'success'
          ).finally(() => this.router.navigate(['/users']).finally());
        }
      });
      this.subs.push(sub3);
    }
  }

  private buildFormData(userdata: IUser | null): void {
    this.userForm = new FormGroup({
      name: new FormControl(userdata?.name, Validators.required),
      email: new FormControl(userdata?.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(userdata?.password),
      enabled: new FormControl(userdata?.enabled || false),
      createdAt: new FormControl(userdata?.createdAt, Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.userId = undefined;
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
