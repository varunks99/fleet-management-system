import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
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
  vehicleData: any = {};
  lat = 45.630001;
  lng = -73.519997;

  constructor(private http: HttpClient) { }

  //Bar Chart
  barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Remaining Fuel'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Gas (gallons)'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }

  };
  barChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Gas', backgroundColor: 'blue', borderColor: 'blue', borderWidth: 1, hoverBackgroundColor: 'lightblue', hoverBorderColor: 'lightblue' },
  ]

  //Line Chart
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Speed (MPH)'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  lineChartLabels: Label[] = [];
  lineChartData: ChartDataSets[] = [];
  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  ngOnInit(): void {
    this.username = window.sessionStorage.getItem('username') || '';
    this.initialize();
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  initialize(): void {
    this.http.get(`${this.url}/manager/${this.username}`)
      .subscribe(
        (data: any) => {

          this.vehicleIDs = data;
          this.barChartLabels = data;
          this.initSpeedChart(data);
          this.collectVehicleData();
        }
      )
  }

  collectVehicleData(): void {
    if (!this.vehicleIDs.length) {
      return
    }

    for (let i = 0; i < this.vehicleIDs.length; i++) {
      this.http.get(`${this.url}/vehicle/${this.vehicleIDs[i]}`)
        .subscribe(
          (data: any) => {
            if (!data)
              return;
            data.uid = String(data.uid);
            this.vehicleData[data.uid] = data;
            this.setFuelData(data.mrGas);
            this.getCurrentSpeed(data.mrSpeed, i)
          }
        )
    }
  }

  setFuelData(mrGas: number) {
    this.barChartData[0].data?.push(mrGas || Math.round(Math.random() * 200));
  }

  initSpeedChart(ids: any) {
    for (let i = 0; i < ids.length; i++) {
      this.lineChartData.push({ data: [], label: ids[i] });
    }
  }

  getCurrentSpeed(mrSpeed: number, i: number) {
    this.lineChartLabels.push(this.getFormattedTime());
    this.lineChartData[i].data?.push(mrSpeed || Math.round(Math.random() * 150));
  }

  getFormattedTime = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
  }

}
