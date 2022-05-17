import { Component, AfterViewInit } from '@angular/core';

import { ThxDeviceData, ThxStatusType }       from '../model/thx.core.model';
import { ThxXenonDeviceType, ThxXenonDevice } from '../model/thx.xenon.device.model';

import { DeviceService } from '@service/device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements AfterViewInit {
  
  devices: ThxXenonDevice[] = [];
  selectedDevice!: ThxXenonDevice;
  
  colors    = [ 'lightblue', 'lightpink', 'lightgreen', '#DDBDF1' ];
  bg_colors = [ '#00000000', '#FFECB3', '#FFCCBC', '#C8E6C9' ];
  
  constructor(private device: DeviceService) { }

  ngAfterViewInit(): void {
    this.device.getXenonDevices()
      .subscribe((data: ThxXenonDevice[]) => {
        this.devices = this.devices.concat(data);
      });
  }

}
