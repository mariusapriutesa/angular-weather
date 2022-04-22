import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: IUser[] = [];
  private subs: Subscription[] = [];
  constructor(private service: UsersService) { }

  ngOnInit(): void {
    const sub5 = this.service.getUsers().subscribe( resp => this.users = resp );
  }

  deleteUser(user: IUser): void {

    Swal.fire({
      title: 'Are you sure?',
      text: `If you delete '${user.name}' you won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {

      if (result.isConfirmed) {

        const sub6 =   this.service.deleteUser(user.id).subscribe( resp => {

          const list = this.users.filter(  item => item.id != user.id );
          this.users = [...list];

          Swal.fire(
            'Deleted!',
            `${user.name} has been deleted.`,
            'success'
          );
        } );
      }

    })



  }
  ngOnDestroy(): void {
   
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}