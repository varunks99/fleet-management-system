import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FleetMapComponent } from './fleet-map/fleet-map.component';
import { EditFleetComponent } from './edit-fleet/edit-fleet.component';
import { AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'fleet-map',
    canActivate: [AuthGuard],
    component: FleetMapComponent
  },
  {
    path: 'edit-fleet',
    canActivate: [AuthGuard],
    component: EditFleetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
