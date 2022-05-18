import { Component, Input, AfterViewInit } from '@angular/core';

import { ThxComResult }                                 from '../../../model/thx.com.status.model';
import { ThxVentDataType, ThxVentData }                 from '../../../model/thx.vent.data.model';
import { ThxXenonDeviceType, ThxXenonDevice }           from '../../../model/thx.xenon.device.model';
import { DeviceService } from '@service/device';

@Component({
  selector: 'vent-table',
  templateUrl: './vent-table.component.html',
  styleUrls: ['./vent-table.component.css']
})
export class VentTableComponent implements AfterViewInit {

  @Input() device!: ThxXenonDevice;
  
  ventData!: ThxVentDataType;

  constructor(private service: DeviceService) {
    this.ventData = new ThxVentData();
  }
  ngAfterViewInit(): void {}



  /// Obtain current ventilation dataset from Xenon-Device
  getVentData() {
    this.service.getVentData(this.device)
      .subscribe((res: ThxComResult<ThxVentDataType>) => {
        /// Com-Status is ignored
        if(res.data !== null) {
          this.ventData = ThxVentData.from(res.data);
        }
      })
  }


}
