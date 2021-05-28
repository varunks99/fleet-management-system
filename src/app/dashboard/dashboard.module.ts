import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';

import { FleetMapComponent } from './fleet-map/fleet-map.component';


@NgModule({
  declarations: [
    FleetMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    })
  ]
})
export class DashboardModule { }
