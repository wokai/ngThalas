import { Component, Input, AfterViewInit } from '@angular/core';

import { DatabaseService }                      from '../database.service';
import { ThxRespDataType }                      from '../../model/thx.db.data.model';
import { ThxEpisodeDataType, ThxEpisodeCountDataType }  from '../../model/thx.db.data.model';



@Component({
  selector: 'resp-display',
  templateUrl: './resp-display.component.html',
  styleUrls: ['./resp-display.component.css']
})
export class RespDisplayComponent implements AfterViewInit {

  /// ---------------------------------------------------------------------- ///
  /// Chart
  /// ---------------------------------------------------------------------- ///
  /// Returns (current) time truncated to last integral fraction of given
  /// time interval (60, 10:12 -> 10:00)
  fullMinutes (min: number, d=new Date()) {
    let ms = 60000 * min;
    return new Date(Math.trunc(d.getTime() / ms) * ms);
  }
  
  startTime: Date;
  endTime: Date;

  /// Transform incoming dates into readable format
  displayStartTime!: String;
  displayEndTime!: String;
  episodeUpdate: number = 0;
  
  setDisplayTimes() {
    this.displayStartTime = `${this.startTime.toTimeString().substr(0, 8)}  (${this.startTime.toLocaleDateString()})`;
    this.displayEndTime = `${this.endTime.toTimeString().substr(0, 8)}  (${this.endTime.toLocaleDateString()})`;
  }
  
  /// ---------------------------------------------------------------------- ///
  /// Respiration
  /// ---------------------------------------------------------------------- ///
  private _episode!: ThxEpisodeCountDataType;
  
  respData: ThxRespDataType[] = [];

  @Input() set episode(episode: ThxEpisodeCountDataType) {
    this._episode = episode;
    if(this.episode){
      /// Clear previous content
      this.respData = [];
      this.db.getRespData(episode.id)
        .subscribe({
          next: (res: ThxRespDataType[]) => { this.respData.push(...res); },
          complete: () => {
            this.respData = [... this.respData];
            this.startTime = new Date(this.respData[0].time);
            this.endTime = new Date(this.respData[this.respData.length - 1].time);
            
            this.setDisplayTimes();
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
    this.setDisplayTimes();
  }

  ngAfterViewInit(): void {}
  
  updateEpisodeTimes() {
    this.episode.begin = this.startTime.toISOString();
    this.episode.end = this.endTime.toISOString();
    this.db.updateEpisodeData(this.episode).subscribe(res => { 
      this.episodeUpdate = res;  /// 1: on success
    });
  }
}
