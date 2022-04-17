import { Component, Input, AfterViewInit } from '@angular/core';

import { DatabaseService }                      from '../database.service';
import { ThxXenonDeviceType, ThxXenonDevice }   from '../../model/thx.xenon.device.model';
import { ThxRespDataType }  from '../../model/thx.db.data.model';

@Component({
  selector: 'resp-display',
  templateUrl: './resp-display.component.html',
  styleUrls: ['./resp-display.component.css']
})
export class RespDisplayComponent implements AfterViewInit {

  @Input() device!: ThxXenonDevice;


  /// Returns (current) time truncated to last integral fraction of given
  /// time interval (60, 10:12 -> 10:00)
  fullMinutes (min: number, d=new Date()) {
    let ms = 60000 * min;
    return new Date(Math.trunc(d.getTime() / ms) * ms);
  }
  
  private startTime: Date;
  private endTime: Date;
  
  resp: ThxRespDataType[] = [];

  constructor(private db : DatabaseService) {
    
    this.startTime = this.fullMinutes(60);
    this.endTime = new Date(this.startTime.getTime() + 2 * 3600 * 1000);
  }

  ngAfterViewInit(): void {
    
    let episode = '0c10ccecf8bd2a4bf1b4a61a918315a7';
    
    this.db.getRespData(this.device, episode)
      .subscribe((res: ThxRespDataType[]) => { 
        this.resp.push(...res);  
        console.log(res.length);
      });
  }

}
