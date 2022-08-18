import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: number;

}
export const ROUTES: RouteInfo[] = [



    // { path: '/admin/manage-rooms', title: 'Manage Rooms',  icon:'notifications', class: '' ,role: 1},
    // { path: '/admin/book-room', title: 'Book Room',  icon:'notifications', class: '' ,role: 1},
    // { path: '/admin/userprofile', title: 'User Profile',  icon:'notifications', class: '' ,role: 1},

    // @owner
    { path: '/owner/dashboard', title: 'Dashboard',  icon:'notifications', class: '' ,role: 1},

    { path: '/owner/manage-rooms', title: 'Manage Rooms',  icon:'notifications', class: '' ,role: 1},
    // @Guest
    { path: '/guest/book-room', title: 'Book Room',  icon:'notifications', class: '' ,role: 2},
    { path: '/guest/userprofile', title: 'User Profile',  icon:'notifications', class: '' ,role: 2},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem.role == this.authService.getUserRole);


  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
