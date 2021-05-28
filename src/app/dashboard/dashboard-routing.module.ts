import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FleetMapComponent } from './fleet-map/fleet-map.component';

const routes: Routes = [
  {
    path: 'fleet-map',
    component: FleetMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
