import { IUser } from '../../../../core/domain/types';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: IUser | undefined;

  constructor(private service: UsersService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.service.getUserById( userId ).subscribe( resp => this.user = resp );
    }
  }

}
