import { Component, Input, AfterViewInit } from '@angular/core';

import { ThxVentDataType, ThxVentData }                 from '../../../model/thx.vent.data.model';
import { ThxXenonDeviceType, ThxXenonDevice }           from '../../../model/thx.xenon.device.model';
import { DeviceService } from '../../device.service';

@Component({
  selector: 'vent-table',
  templateUrl: './vent-table.component.html',
  styleUrls: ['./vent-table.component.css']
})
export class VentTableComponent implements AfterViewInit {

  @Input() device!: ThxXenonDevice;
  
  ventData!: ThxVentDataType;

  constructor(private service: DeviceService) { }
  ngAfterViewInit(): void {}


  /*
  /// Obtain current ventilation dataset from Xenon-Device
  getVentData() {
    this.service.getVentData(this.device)
      .subscribe((res: ThxComResult<ThxVentDataType>) => {
        //this.setComStatus(res.com)
        if(res.data !== null) {
          this.device.vent = ThxVentData.from(res.data);
        }
      })
  }
  * */

}
