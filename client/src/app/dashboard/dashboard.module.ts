import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';

import { FleetMapComponent } from './fleet-map/fleet-map.component';
import { EditFleetComponent } from './edit-fleet/edit-fleet.component';


@NgModule({
  declarations: [
    FleetMapComponent,
    EditFleetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ChartsModule
  ]
})
export class DashboardModule { }
