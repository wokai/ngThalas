import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';

import { Chart, LineController, LineElement, PointElement, LinearScale, Title, ChartType, ScatterDataPoint, TimeScale } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, TimeScale);

import { ThxRespDataType }                      from '../../../model/thx.db.data.model';


export class TimePoint {
  x : number;
  y : number;
  
  constructor(x = new Date().getTime(), y = 0) {
    this.x = x;
    this.y = y;
  }
}



@Component({
  selector: 'resp-chart',
  templateUrl: './resp-chart.component.html',
  styleUrls: ['./resp-chart.component.css']
})
export class RespChartComponent implements AfterViewInit {
  
  /// Returns (current) time truncated to last integral fraction of given
  /// time interval (60, 10:12 -> 10:00)
  lastFullInterval (min: number, d=new Date()) {
    let ms = 60000 * min;
    return new Date(Math.trunc(d.getTime() / ms) * ms);
  }
  
  nextFullInterval (min: number, d=new Date()){
    let ms = 60000 * min;
    return new Date(Math.ceil(d.getTime() / ms) * ms);
  }

  startTime!: Date;
  endTime!: Date;
  private _respData: ThxRespDataType[] = [];
  
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;

  @Input() set respData(respData: ThxRespDataType[]){
    this._respData = [...respData];
    if(this._respData.length){ /// Prevent TypeScript error...
      
      this.startTime = this.lastFullInterval(60, new Date(this._respData[0].time));
      this.endTime   = this.nextFullInterval(60, new Date(this._respData[this.respData.length - 1].time));
      
      this.blueData.length = 0;
      this._respData.forEach((r: ThxRespDataType) => {
        this.blueData.push(new TimePoint(new Date(r.time).getTime(), r.tidalvolume));
      })
      
      this.chart.options.scales = {
          x: {
            type: 'time',
            min: this.startTime.getTime(), // ToDo: Provide internal conversion to appropriate format...
            max: this.endTime.getTime(),
            time: {
              tooltipFormat: "dd-MM-yyyy hh:mm:ss",
              displayFormats: { minute: "HH:mm" },
              unit: 'minute',
              stepSize: 15
            }
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            max: 1000,
            ticks: {
              stepSize: 200
            }
          }
        }
      this.chart.update();

    }
  }
  get respData() { return this._respData; }
  
  
    
  private blueData: TimePoint[] = [];
  private redData: TimePoint[] = [];
  
  constructor() {
    /// Must be set in constructor
    this.startTime = this.lastFullInterval(60);
    this.endTime = this.nextFullInterval(60); 
  }

  ngAfterViewInit(): void {
    this.chartRef.nativeElement.width = 600;
    this.chartRef.nativeElement.height = 250;
 
    
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line' as ChartType,
      data: {
        datasets: [
          { 
            data: this.blueData,
            /// Light Blue 50
            backgroundColor: '#E1F5FE', /// 0
            borderColor: '#29B6F6',     /// 400
          },
          {
            data: this.redData,
            /// Red 50
            backgroundColor: '#FFEBEE',
            borderColor: '#EF5350'
          }
        ]
      },
      options: {
        parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y'
        },
        scales: {
          x: {
            type: 'time',
            min: this.startTime.getTime(), // ToDo: Provide internal conversion to appropriate format...
            max: this.endTime.getTime(),
            time: {
              tooltipFormat: "dd-MM-yyyy hh:mm:ss",
              displayFormats: { minute: "HH:mm" },
              unit: 'minute',
              stepSize: 15
            }
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        }
      }
    });
  }

}
