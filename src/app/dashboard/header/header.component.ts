import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username: string;
  constructor() { }

  ngOnInit() {
  // this.username= this.authService.currentUser();
   //alert(this.authService.currentUser());
  }
  logout() {
   // this.authService.signOut();
  }
 
}