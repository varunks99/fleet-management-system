import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService/session-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private _sessionService: SessionService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    this._sessionService.register(data)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigate(['/login']);
        }
      )
  }

}
