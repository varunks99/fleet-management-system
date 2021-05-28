import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent implements OnInit {
  url: string = environment.apiUrl;
  username: string = '';
  vehicleIDs: Array<string> = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.username = window.sessionStorage.getItem('username') || '';
  }

  initialize(): void {
    this.http.get(`${this.url}/manager/${this.username}`)
      .subscribe(
        (data: any) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].vid != null) {
              this.vehicleIDs.push(data[i].vid);
            }
          }
        }
      )
  }

}
