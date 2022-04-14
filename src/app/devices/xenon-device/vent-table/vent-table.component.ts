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

  constructor() { }
  ngAfterViewInit(): void {}

}
