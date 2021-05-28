import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService/session-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message = '';
  disabled = false;
  buttonText = 'Log In';
  constructor(private http: HttpClient, private router: Router, private _sessionService: SessionService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    this.disabled = true;
    this.buttonText = 'Logging in...';
    this._sessionService.login(data)
      .subscribe(
        (res: any) => {
          if (res.Validated)
            this.router.navigate(['/dashboard']);
          else {
            this.disabled = false;
            this.buttonText = 'Log In';
            this.message = 'Username or password is wrong';
          }
        },
        (err) => {
          this.disabled = false;
          this.buttonText = 'Log In';
          if (err.status == 404) {
            this.message = 'Username does not exist'
          } else if (err.status == 400) {
            this.message = 'Incorrect password'
          }
        })
  }

}
