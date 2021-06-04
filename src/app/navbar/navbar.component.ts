import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/sessionService/session-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string = '';
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.username = window.sessionStorage.getItem('username') || '';
  }

  logOut() {
    this.sessionService.logout();
  }

}
