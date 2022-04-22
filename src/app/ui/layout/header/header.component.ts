import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService
    , private router:Router
    
    ) {}
  menuItems: MenuItem[] = [];
  


  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Login',
        routerLink: '/login',
        icon: PrimeIcons.USER,
      },
      {
        label: 'Users',
        routerLink: '/users',
        icon: PrimeIcons.USERS,
      },
      {
        label: 'Weather',
        routerLink: '/weather',
        icon: PrimeIcons.CLOUD,
      },
    ];
  }
  disconnect(): void {
    this.auth.disconect();
    this.router.navigate(['/login'])


  }
}
