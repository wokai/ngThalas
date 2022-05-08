import { Component, Input, AfterViewInit } from '@angular/core';

import { DatabaseService }                      from '../database.service';
import { ThxRespDataType }                      from '../../model/thx.db.data.model';
import { ThxEpisodeCountDataType }              from '../../model/thx.db.data.model';

@Component({
  selector: 'resp-display',
  templateUrl: './resp-display.component.html',
  styleUrls: ['./resp-display.component.css']
})
export class RespDisplayComponent implements AfterViewInit {

  /// Returns (current) time truncated to last integral fraction of given
  /// time interval (60, 10:12 -> 10:00)
  fullMinutes (min: number, d=new Date()) {
    let ms = 60000 * min;
    return new Date(Math.trunc(d.getTime() / ms) * ms);
  }
  
  startTime: Date;
  endTime: Date;
  private _episode!: ThxEpisodeCountDataType;
  
  resp: ThxRespDataType[] = [];

  @Input() set episode(episode: ThxEpisodeCountDataType) {
    this._episode = episode;
    if(this.episode){
      /// Clear previous content
      this.resp = [];
      this.db.getRespData(episode.id)
        .subscribe({
          next: (res: ThxRespDataType[]) => { this.resp.push(...res); },
          complete: () => {
            this.resp = [... this.resp];
            this.startTime = new Date(this.resp[0].time);
            this.endTime = new Date(this.resp[this.resp.length - 1].time);
          }
        })
    }
  }
  
  get episode(): ThxEpisodeCountDataType {
    return this._episode;
  }



  constructor(private db : DatabaseService) {
    
    this.startTime = this.fullMinutes(60);
    this.endTime = new Date(this.startTime.getTime() + 2 * 3600 * 1000);
  }

  ngAfterViewInit(): void {}
}
