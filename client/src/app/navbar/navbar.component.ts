import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../services/sessionService/session-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  userName$!: Observable<string | null>;
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.userName$ = this.sessionService.getUserName();
    console.log(this.userName$);

  }

  logOut() {
    this.sessionService.logout();
  }

}
