import { Component, OnInit } from '@angular/core';
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

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe( resp => this.users = resp );
  }

  searchUser(name : string){

    this.service.searchUser(name).subscribe(resp => {
    
    
      const list =this.users.filter(user => user.name != name);
      this.users=[...list]
      //this.use
    });
    
  }



  
  deleteUser(id :number):void{
   
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto.!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(id).subscribe(resp => {
    
    
          const list =this.users.filter(user => user.id != id);
          this.users=[...list]
          //this.use
        });
        Swal.fire(

          'Deleted!',
          'El usuario ha sido borrado.',
          'success'
        )
      }
    })
   /* this.service.deleteUser(id).subscribe(resp => {
    
    
      const list =this.users.filter(user => user.id != id);
      this.users=[...list]
      //this.use
    
    
    });*/
  }
}