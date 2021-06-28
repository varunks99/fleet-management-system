import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../../environments/environment';

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
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ]
})
export class DashboardModule { }
