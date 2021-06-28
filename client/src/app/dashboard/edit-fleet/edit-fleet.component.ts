import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-fleet',
  templateUrl: './edit-fleet.component.html',
  styleUrls: ['./edit-fleet.component.css']
})
export class EditFleetComponent implements OnInit {
  url: string = environment.apiUrl;
  username: string = '';
  vehicleIDs: Array<string> = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.username = window.sessionStorage.getItem('username') || '';
    this.getVehicleIDs();
  }

  getVehicleIDs() {
    this.http.get(`${this.url}/manager/${this.username}`)
      .subscribe(
        (data: any) => {
          this.vehicleIDs = data;
        }
      )
  }

  add(data: any) {
    console.log(data);

    data.mrLat = 45 + Math.random();
    data.mrLong = (73 + Math.random()) * -1;
    this.http.post(`${this.url}/vehicle`, data)
      .subscribe(
        (res: any) => {
          this.http.put(`${this.url}/manager/${this.username}`, { uid: data.uid })
            .subscribe(
              (res: any) => {
                this.vehicleIDs.push(data.uid);
                alert("Added " + data.uid);
              }
            )
        }
      )
  }

  delete(id: string) {
    this.http.delete(`${this.url}/vehicle/${id}`)
      .subscribe(
        (res: any) => {
          let idx = this.vehicleIDs.indexOf(id);
          this.vehicleIDs.splice(idx, 1);
          alert("Deleted " + id)
        }
      )
  }
}
