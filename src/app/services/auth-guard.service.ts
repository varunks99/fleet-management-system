import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (!window.sessionStorage.getItem('username')) {
      this.router.navigate(['/'])
      return false;
    }
    return true;
  }

}

