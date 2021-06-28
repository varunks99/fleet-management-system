import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeGuard } from '../services/home-guard.service';
const routes: Routes = [
    {
        path: 'login',
        canActivate: [HomeGuard],
        component: LoginComponent
    },
    {
        path: 'register',
        canActivate: [HomeGuard],
        component: RegisterComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
