import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

/// ------------------------------------------------------------------------ ///
/// Chart plugins are registrated in 'database.service.ts'
import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';
import { Chart, ChartType } from 'chart.js'
/// ------------------------------------------------------------------------ ///



import { ThxGasDataType, TimePoint}                      from '../../../model/thx.db.data.model';



@Component({
  selector: 'gas-chart',
  templateUrl: './gas-chart.component.html',
  styleUrls: ['./gas-chart.component.css']
})
export class GasChartComponent implements AfterViewInit {
  
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
  private _gasData: ThxGasDataType[] = [];
  
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;


  @Input() set gasData(gasData: ThxGasDataType[]){
    this._gasData = [...gasData];
     if(this._gasData.length){ /// Prevent TypeScript error...
     
        this.startTime = this.lastFullInterval(60, new Date(this._gasData[0].time));
        this.endTime   = this.nextFullInterval(60, new Date(this._gasData[this._gasData.length - 1].time));  
       
        this.blueData.length = 0;
        this.redData.length = 0;
        this.greenData.length = 0;
        this._gasData.forEach((g: ThxGasDataType) => {
          this.blueData.push(new TimePoint(new Date(g.time).getTime(), g.fio2));
          this.redData.push(new TimePoint(new Date(g.time).getTime(), g.feco2));
          this.greenData.push(new TimePoint(new Date(g.time).getTime(), g.o2uptake));
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
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      this.chart.update();
       
       
     }
  }

  get gasData() { return this._gasData; }

    
  private blueData: TimePoint[] = [];
  private redData: TimePoint[] = [];
  private greenData: TimePoint[] = [];

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
            label: "FiO2",
            data: this.blueData,
            /// Light Blue 50
            backgroundColor: '#E1F5FE', /// 0
            borderColor: '#29B6F6',     /// 400
            pointRadius: 2
          },
          {
            data: this.redData,
            label: 'EtCO2',
            /// Red 50
            backgroundColor: '#FFEBEE',
            borderColor: '#EF5350',
            pointRadius: 2
          },
          {
            data: this.greenData,
            label: 'O2-consumption',
            backgroundColor: '#adf0ed',
            borderColor: '#20b2aa',
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
