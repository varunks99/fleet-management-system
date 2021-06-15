import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent implements OnInit {
  @ViewChild(BaseChartDirective) public barChart!: BaseChartDirective;

  url: string = environment.apiUrl;
  username: string = '';
  vehicleIDs: Array<string> = [];
  vehicleData: any = {};
  selectedVehicle: number = 0;
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
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Speed' }
  ];

  ngOnInit(): void {
    this.username = window.sessionStorage.getItem('username') || '';
    this.initialize();
    setInterval(() => {
      this.collectVehicleData();
    }, 2000);
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  initialize(): void {
    this.http.get(`${this.url}/manager/${this.username}`)
      .subscribe(
        (data: any) => {
          this.vehicleIDs = data;
          this.selectedVehicle = data[0];
          this.barChartLabels = data;
          this.collectVehicleData();
        }
      )
  }

  collectVehicleData(): void {
    for (let i = 0; i < this.vehicleIDs.length; i++) {
      this.http.get(`${this.url}/vehicle/${this.vehicleIDs[i]}`)
        .subscribe(
          (data: any) => {
            if (!data)
              return;
            data.uid = String(data.uid);
            this.vehicleData[data.uid] = data;
            this.barChartData[0].data![i] = data.mrGas;
            if (data.uid == this.selectedVehicle)
              this.setCurrentSpeed(data.mrSpeed)
          }
        )
    }
    this.barChart.chart.update();
  }

  setFuelData(mrGas: number) {
    this.barChartData[0].data?.push(mrGas || Math.round(Math.random() * 200));
  }

  setCurrentSpeed(speed: number) {
    if (this.lineChartData[0].data!.length > 15) {
      this.lineChartLabels.shift();
      this.lineChartData[0].data?.shift();
    }
    this.lineChartLabels.push(this.getFormattedTime());
    this.lineChartData[0].data?.push(speed);
  }

  setVehicle(event: any) {
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    this.selectedVehicle = event.target.value;
  }


  getFormattedTime = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
  }

}
