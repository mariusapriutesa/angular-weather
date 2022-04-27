import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  p: number = 1;
  total: number = 0;
  
  cols: any[] | undefined;

  totalRecords: number | undefined;

  loading: boolean | undefined;
  users: IUser[] = [];
  virtualDatabase!: IUser[];
//totalRecords=this.users.length;

  private subs: Subscription[] = [];
  constructor(private service: UsersService) { }

  ngOnInit(): void {
    const sub5 = this.service.getUsers().subscribe( resp => this.users = resp );
    
  }
  getUsersP(){
    this.service.getUsersP(this.p)
      .subscribe((response: any) => {
        this.users = response.data;
        this.total = response.total;
      });
} 
pageChangeEvent(event: number){
  this.p = event;
  this.getUsersP();
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
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    // in real world scenario when the loadCustomers will be called we will make a call to the real database
    //to fetch the required records
    //event.first = offset of the first row. For example in our case it will be 1 for the first page, 11 for the second page and so on.
    //event.rows = Rows to be displayed per page in the datatable. In our case it will be 10
    
  }
  ngOnDestroy(): void {
   
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}