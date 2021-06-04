import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FleetMapComponent } from './fleet-map/fleet-map.component';
import { EditFleetComponent } from './edit-fleet/edit-fleet.component';

const routes: Routes = [
  {
    path: 'fleet-map',
    component: FleetMapComponent
  },
  {
    path: 'edit-fleet',
    component: EditFleetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
