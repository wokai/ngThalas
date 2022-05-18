import { Component, Input, AfterViewInit } from '@angular/core';

import { ThxDeviceData, ThxStatusType }                 from '../../../model/thx.core.model';
import { ThxComStatusType, ThxComResult, ThxComStatus } from '../../../model/thx.com.status.model';
import { ThxOsStatusType, ThxOsStatus }                 from '../../../model/thx.os.status.model';
import { ThxXenonStatusType, ThxXenonStatus }           from '../../../model/thx.xenon.status.model';
import { ThxVentDataType, ThxVentData }                 from '../../../model/thx.vent.data.model';
import { ThxXenonDeviceType, ThxXenonDevice }           from '../../../model/thx.xenon.device.model';


import { DeviceService } from '../../device.service';

@Component({
  selector: 'device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.css']
})
export class DeviceStatusComponent implements AfterViewInit {

  @Input() device!: ThxXenonDevice;
  
  pingResult: boolean = false;

  constructor(private service: DeviceService) { }

  ngAfterViewInit(): void {}

  /// ---------------------------------------------------------------------- ///
  /// Executed during every communication between node-talas and xenon
  /// (ping, getOsData, getXenonStatus, ...)
  /// ---------------------------------------------------------------------- ///
  setComStatus(com: ThxComStatusType) {
    //console.log(com);
    
    this.device.com.online = com.online;
    this.device.com.errno = com.errno;
    this.device.com.code = com.code;
    
    if(com.online) {
      this.device.com.status = ThxComStatus.levels.online;  /// Online  (green)
    } else {
      this.device.com.status = ThxComStatus.levels.offline; /// Offline (deep orange)
    }
  }
  
  ping() {
    this.service.ping(this.device)
     .subscribe((res: boolean) => { this.pingResult = res; });
  }
    
  getOsData() {
    this.service.getOsData(this.device)
      .subscribe((res: ThxOsStatusType) => {
        if(res !== null) {
          this.device.os.assign(res);
        }
      });
  }
  
  getXenonStatus() {
    this.service.getXenonStatus(this.device)
      .subscribe((res: ThxComResult<ThxXenonStatusType>) => {
        this.setComStatus(res.com)
        if(res.data !== null){
          this.device.xenon = ThxXenonStatus.from(res.data);
          /// Copy xenon-device-status level (value from xenon StatusController)
          this.device.xenon.status = ThxXenonStatus.levelArray[res.data.busStatus];
        }
      });
  }
  
  getPortPaths() {
    this.service.getPortPaths(this.device)
      .subscribe((res: ThxComResult<string[]>) => {
        this.setComStatus(res.com)
        this.device.paths.length=0;
        if(res.data !== null) {
          if(res.data.length) {
            this.device.paths.push(...res.data);
            /// Increase device-status to 'Path detected' (blue)
            if(this.device.status.id < 3) {
              this.device.status = ThxXenonDevice.levelArray[3];
            }
          } else {
            this.device.paths.push('(No paths present)');
          }
        }
      })
  }
  
  /// Starts RS232 communication
  getPortOpen() {
    this.service.getPortOpen(this.device)
      .subscribe((res: ThxComResult<ThxXenonStatusType>) => {
        this.setComStatus(res.com)
        if(res.data !== null) {
          this.device.xenon = ThxXenonStatus.from(res.data);
        }
      })
  }
  
  /// Hard shutdown of RS232 port
  getPortClose() {
    this.service.getPortClose(this.device)
      .subscribe((res: ThxComResult<ThxXenonStatusType>) => {
        
        /// ================================================================ ///
        /// Com is undefined ??
        console.log(res.com)
        this.setComStatus(res.com)
        /// ================================================================ ///
        if(res.data !== null) {
          this.device.xenon = ThxXenonStatus.from(res.data);;
        }
      })
  }
  
  /// Coordinated termination of Medibus + closing port 
  getPortStop() {
    this.service.getPortStop(this.device)
      .subscribe((res: ThxComResult<ThxXenonStatusType>) => {
        this.setComStatus(res.com)
        if(res.data !== null) {
          this.device.xenon = ThxXenonStatus.from(res.data);;
        }
      })
  }
  
  /// Obtain current ventilation dataset from Xenon-Device
  getVentData() {
    this.service.getVentData(this.device)
      .subscribe((res: ThxComResult<ThxVentDataType>) => {
        this.setComStatus(res.com)
        if(res.data !== null) {
          this.device.vent = ThxVentData.from(res.data);
        }
      })
  }

}
