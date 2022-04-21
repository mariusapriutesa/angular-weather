import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
menuItems: MenuItem[] = [];
  ngOnInit(): void {
    
    this.menuItems = [
      {
        label: 'Users',
        routerLink: '/users',
        icon: PrimeIcons.USERS
      },
      {
        label: 'Weather',
        routerLink: '/weather',
        icon: PrimeIcons.CLOUD
      }
  ];


  }

}
