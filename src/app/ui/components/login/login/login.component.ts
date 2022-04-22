import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup | undefined;
  userId: number | undefined;
 
  email: string | undefined;
  password: string | undefined;
  user: IUser | undefined;
  constructor(private service: UsersService,
    private route:ActivatedRoute)  {}
  

  ngOnInit(): void {
    
    
    
  }
  login() {
    const userId = this.route.snapshot.params['id'];
    if (userId) { 
      this.service.getUserById( userId ).subscribe( resp => this.user = resp );
      if(this.email == this.user?.email){
        console.log('sadsadasdasda');
  
      }
      console.log(this.email);
      console.log(this.password);
    }
    
  }
}
