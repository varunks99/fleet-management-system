import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { environment } from '../../../environments/environment';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import VectorSource from 'ol/source/Vector';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent implements OnInit {
  @ViewChild(BaseChartDirective) public barChart!: BaseChartDirective;

  url: string = environment.apiUrl;
  map: any;
  vectorLayer: any;
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
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: function (feature) {
        return [new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: IconAnchorUnits.FRACTION,
            anchorYUnits: IconAnchorUnits.PIXELS,
            src: '../../../../assets/images/marker.png'
          }),
          text: new Text({
            text: feature.get('label'),
            fill: new Fill({ color: 'white' }),
            stroke: new Stroke({ color: 'black', width: 2 }),
            offsetY: -40,
            scale: 1.5
          })
        })]
      }
    })
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([-73.519997, 45.530001]),
        zoom: 7
      })
    });

    this.username = window.sessionStorage.getItem('username') || '';
    this.initialize();
    setInterval(() => {
      this.collectVehicleData();
      this.setMarkers()
    }, 2000);
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  setMarkers() {
    this.vectorLayer.getSource().clear();
    let features = []
    for (let id of this.vehicleIDs) {
      features.push(new Feature({
        geometry: new Point(fromLonLat([this.vehicleData[id].mrLong, this.vehicleData[id].mrLat])),
        label: this.vehicleData[id].uid
      }))
    }
    this.vectorLayer.getSource().addFeatures(features);
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
    this.barChart?.chart?.update();
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
