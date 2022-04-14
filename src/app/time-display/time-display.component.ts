import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { TimePoint, TimeService } from '../time.service';
import 'chartjs-adapter-date-fns';
import {de} from 'date-fns/locale';

import { Chart, LineController, LineElement, PointElement, LinearScale, Title, ChartType, ScatterDataPoint, TimeScale } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, TimeScale);


@Component({
  selector: 'time-display',
  template: '<canvas #chart></canvas>',
  styleUrls: ['./time-display.component.css']
})
export class TimeDisplayComponent implements AfterViewInit {

  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: Chart;
  private startTime: number;
  private endTime: number;
  private blueData: TimePoint[] = [];
  private redData: TimePoint[] = [];

  constructor(private timeService: TimeService) {
    this.startTime = timeService.getStartTime();
    this.endTime = timeService.getEndTime();
  }
  
  
  addDataPoint(p: TimePoint): void {
    this.blueData.push(p);
    this.redData.push(new TimePoint(p.x, p.y/2));
    this.chart.update();
  }

  /// https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=6
  /// https://material.io/design/color/the-color-system.html
  /// https://developer.mozilla.org/de/docs/Web/CSS/CSS_Colors/Color_picker_tool
  /// https://material.io/resources/color/#!/?view.left=1&view.right=0&primary.color=1976D2
  ngAfterViewInit(): void {
    this.chartRef.nativeElement.width = 600;
    this.chartRef.nativeElement.height = 300;
    
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
            min: this.startTime,
            max: this.endTime,
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
    })
    
    this.timeService.subscribe({
      next: val => { this.addDataPoint(val); },
      complete: () => { console.log('Complete.'); }
    });
    
  }

}
