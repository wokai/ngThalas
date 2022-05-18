import { Component, EventEmitter, Input, Output, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource }               from '@angular/material/table';

import { ThxDeviceData      } from '@model/core';
import { ThxXenonDeviceType, ThxXenonDevice } from  '@model/device';
import { DeviceService      } from '@service/device';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements AfterViewInit {

  devices: ThxXenonDevice [] = [];

  @Input() device!: ThxXenonDevice;
  @Output() deviceChange = new EventEmitter<ThxXenonDevice>();
  dataSource: MatTableDataSource<ThxXenonDevice>;

  /// Table data definition
  deviceColumns: string[] = ['name', 'com', 'device', 'xenon' ];


  constructor(private dev : DeviceService) {
    this.dataSource = new MatTableDataSource<ThxXenonDevice>([]);
  }

  ngAfterViewInit(): void {
    this.dev.getXenonDevices().subscribe({
      next: (val: ThxXenonDevice []) => { this.devices.push(...val); },
      complete: () => {
        this.devices = [ ... this.devices ];
        this.dataSource = new MatTableDataSource<ThxXenonDevice>(this.devices);
      }
    });
  }
  
  onRowClicked(dev: ThxXenonDevice): void {
    this.device = dev;
    this.deviceChange.emit(dev);
  }

}
