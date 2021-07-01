import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/sessionService/session-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status: any;
  constructor(private router: Router, private _sessionService: SessionService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    this._sessionService.register(data)
      .subscribe(
        (res: any) => {
          this.status = res;
          if (res.flag == 'success')
            setTimeout(() => this.router.navigate(['/login']), 2000)

        },
        (err: any) => {
          this.status = err.error;
        }
      )
  }

}
