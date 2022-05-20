import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

/// ------------------------------------------------------------------------ ///
/// Chart plugins are registrated in 'database.service.ts'
import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';
import { Chart, ChartType } from 'chart.js'

/// ------------------------------------------------------------------------ ///

import { ThxRespDataType, TimePoint}                      from '../../../model/thx.db.data.model';


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
  get respData() { return this._respData; }
  
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;
  
  private blueData:  TimePoint[] = [];
  private redData:   TimePoint[] = [];
  private greenData: TimePoint[] = [];

  @Input() set respData(respData: ThxRespDataType[]){
    this._respData = [...respData];
    if(this._respData.length){ /// Prevent TypeScript error...
      
      this.startTime = this.lastFullInterval(60, new Date(this._respData[0].time));
      this.endTime   = this.nextFullInterval(60, new Date(this._respData[this._respData.length - 1].time));
      
      this.blueData.length = 0;
      this.redData.length = 0;
      this.greenData.length = 0;
      
      this._respData.forEach((r: ThxRespDataType) => {
        this.blueData.push(new TimePoint(new Date(r.time).getTime(), r.tidalvolume));
        this.redData.push(new TimePoint(new Date(r.time).getTime(), r.peak));
        this.greenData.push(new TimePoint(new Date(r.time).getTime(), r.peep));
      })
      
      this.chart.options.scales = {
          x: {
            type: 'time',
            min: this.startTime.getTime(),
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
          },
          y1: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            max: 50,
            ticks: {
              stepSize: 10
            }
          }
        }
      this.chart.update();

    }
  }

  
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
            label: 'Tidal volume',
            data: this.blueData,
            /// Light Blue 50
            backgroundColor: '#E1F5FE', /// 0
            borderColor: '#007bff',     /// 400
            pointRadius: 2,
            yAxisID: 'y',
          },
          {
            label: 'Peak pressure',
            data: this.redData,
            /// Red 50
            backgroundColor: '#FFEBEE',
            borderColor: '#dc3545',
            pointRadius: 1,
            yAxisID: 'y1',
          },
          {
            data: this.greenData,
            label: 'PEEP',
            backgroundColor: '#adf0ed',
            borderColor: '#28a745',
            pointRadius: 2,
            yAxisID: 'y1',
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
            min: this.startTime.getTime(),
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
            display: true,
            max: 1000,
            ticks: {
              stepSize: 200
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            max: 40,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    });
  }

}
