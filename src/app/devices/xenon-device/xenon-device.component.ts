import { Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

import { ThxXenonDeviceType, ThxXenonDevice }  from '../../model/thx.xenon.device.model';
import { DeviceService }                       from '../device.service';
import { ThxComStatusType, ThxComStatus }      from '../../model/thx.com.status.model';


@Component({
  selector: 'xenon-device',
  templateUrl: './xenon-device.component.html',
  styleUrls: ['./xenon-device.component.css']
})
export class XenonDeviceComponent implements AfterViewInit {
  
  @Input() device!: ThxXenonDevice;

  /// ToDo: Temporary values - remove when unused
  colors    = [ 'lightblue', 'lightpink', 'lightgreen', '#DDBDF1' ];
  bg_colors = [ '#00000000', '#FFECB3', '#FFCCBC', '#C8E6C9' ];
  
  comStatus: ThxComStatus;
  
  constructor(private service: DeviceService) {
    this.comStatus = new ThxComStatus();
    
    service.getComStatusObservable().subscribe({
      next: (s) => { 
        this.comStatus = s;
        console.log(s);
      }
    });
  }

  ngAfterViewInit(): void { }
}
