import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

/// ------------------------------------------------------------------------ ///
/// Chart plugins are registrated in 'database.service.ts'
import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';
import { Chart, ChartType } from 'chart.js'
/// ------------------------------------------------------------------------ ///

import { ThxInhalDataType, TimePoint}                      from '../../../model/thx.db.data.model';

@Component({
  selector: 'inhal-chart',
  templateUrl: './inhal-chart.component.html',
  styleUrls: ['./inhal-chart.component.css']
})
export class InhalChartComponent implements AfterViewInit {

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
  private _inhalData: ThxInhalDataType[] = [];
  get inhalData() { return this._inhalData; }
  
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;
  
  consMax: number = 0;
  consLast: number = 0;
  private inspData: TimePoint[] = [];
  private macData:  TimePoint[] = [];
  private consData: TimePoint[] = [];

  @Input() set inhalData(inhalData: ThxInhalDataType[]){
    this._inhalData = [...inhalData];
    if(this._inhalData.length){ /// Prevent TypeScript error...
      
        this.startTime = this.lastFullInterval(60, new Date(this._inhalData[0].time));
        this.endTime   = this.nextFullInterval(60, new Date(this._inhalData[this._inhalData.length - 1].time));  
        
        this.consMax = Math.max(...this._inhalData.map(i => i.cons));
        this.consLast = this._inhalData[this._inhalData.length - 1].cons;
       
        this.inspData.length = 0;
        this.macData.length  = 0;
        this.consData.length = 0;
        this._inhalData.forEach((i: ThxInhalDataType) => {
          this.inspData.push(new TimePoint(new Date(i.time).getTime(), i.insp));
          this.macData.push( new TimePoint(new Date(i.time).getTime(), i.mac));
          this.consData.push(new TimePoint(new Date(i.time).getTime(), i.cons));
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
            max: 10,
            ticks: {
              stepSize: 2
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: true,
            max: Math.ceil(this.consMax/10) * 10,
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
            label: "Insp",
            data: this.inspData,
            /// Light Blue 50
            backgroundColor: '#E1F5FE', /// 0
            borderColor: '#007bff',     /// 400
            pointRadius: 2
          },
          {
            data: this.macData,
            label: 'MAC',
            /// Red 50
            backgroundColor: '#FFEBEE',
            borderColor: '#dc3545',
            pointRadius: 2
          },
          {
            data: this.consData,
            label: 'Consumption',
            backgroundColor: '#adf0ed',
            borderColor: '#28a745',
            pointRadius: 2
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        },

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
