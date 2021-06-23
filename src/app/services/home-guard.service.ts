import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (window.sessionStorage.getItem('username')) {
            this.router.navigate(['/fleet-map'])
            return false;
        }
        return true;
    }

}

