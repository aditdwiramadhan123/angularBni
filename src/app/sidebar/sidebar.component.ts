import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  logoUrl =
    'https://th.bing.com/th/id/OIP.36fCycmxr3gzbABn5gmJjgHaHa?rs=1&pid=ImgDetMain';
    
  links = [
    { path: '/dashboard', title: 'Dashboard', icon: 'fa-home' },
    { path: '/admin', title: 'Admin', icon: 'fa-user' },
  ];
  
}
