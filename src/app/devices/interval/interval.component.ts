import { Component, Input, AfterViewInit } from '@angular/core';


import { ThxIntervalType  } from '../../model/thx.core.model';
import { ThxXenonDeviceType, ThxXenonDevice }           from '../../model/thx.xenon.device.model';
import { ThxComStatusType, ThxComResult, ThxComStatus } from '../../model/thx.com.status.model';
import { DeviceService } from '../device.service';

@Component({
  selector: 'interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
export class IntervalComponent implements AfterViewInit {

  @Input() device!: ThxXenonDevice;
  
  status = {
    start: '',
    stop: '',
    cycles: 0
  };

  constructor(private service: DeviceService) {}
  ngAfterViewInit(): void {}
  
  intervalStart() {
    this.service.getIntervalStart()
      .subscribe((res: ThxIntervalType) => { 
        this.status.start = res.start;
        this.status.cycles = res.cycles;
        this.status.stop = res.stop;
      });
  }
  
  intervalStop() {
    this.service.getIntervalStop()
      .subscribe((res: ThxIntervalType) => { 
        this.status.start = res.start;
        this.status.cycles = res.cycles;
        this.status.stop = res.stop;
        console.log(res);
      });
  }
  
  intervalStatus() {
    this.service.getIntervalStatus()
      .subscribe((res: ThxIntervalType) => {
        this.status.start = res.start;
        this.status.cycles = res.cycles;
        this.status.stop = res.stop;
        console.log(res); 
      });
  }
}
