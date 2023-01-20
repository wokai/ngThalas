import { Component, Input, AfterViewInit } from '@angular/core';

import { DatabaseService }                      from '../database.service';
import { ThxRespDataType, ThxGasDataType, ThxInhalDataType } from '../../model/thx.db.data.model';
import { ThxEpisodeDataType, ThxEpisodeRespDataType }  from '../../model/thx.db.data.model';



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
  firstRecordTime!: String;
  lastRecordTime!: String;
  episodeUpdate: number = 0;
  
  
  
  setDisplayTimes() {
    this.firstRecordTime = `${this.startTime.toTimeString().substr(0, 8)}  (${this.startTime.toLocaleDateString()})`;
    this.lastRecordTime = `${this.endTime.toTimeString().substr(0, 8)}  (${this.endTime.toLocaleDateString()})`;
  }
  
  /// ---------------------------------------------------------------------- ///
  /// Respiration
  /// ---------------------------------------------------------------------- ///
  private _episode!: ThxEpisodeRespDataType;
  
  respData:  ThxRespDataType[]  = [];
  gasData:   ThxGasDataType[]   = [];
  inhalData: ThxInhalDataType[] = [];
  
  get episode(): ThxEpisodeRespDataType { return this._episode; }

  
  refreshData() {
    if(this.episode) {
      
      this.respData.length = 0;
      this.gasData.length = 0;
      this.inhalData.length = 0;
      
      this.db.getRespData(this.episode.eid)
      .subscribe({
        next: (res: ThxRespDataType[]) => { this.respData.push(...res); },
        complete: () => {
          this.respData = [... this.respData];
          this.startTime = new Date(this.respData[0].time);
          this.endTime = new Date(this.respData[this.respData.length - 1].time);
          this.setDisplayTimes();
        }
      })
 
      this.db.getGasData(this.episode.eid)
      .subscribe({
        next: (res: ThxGasDataType[]) => { this.gasData.push(...res); },
        complete: () => { this.gasData = [... this.gasData]; }
      });
      
      this.db.getInhalData(this.episode.eid)
        .subscribe({
          next: (res: ThxInhalDataType[]) => { this.inhalData.push(...res); },
          complete: () => {
            this.inhalData = [...this.inhalData];
            this.startTime = new Date(this.inhalData[0].time);
            this.endTime   = new Date(this.inhalData[this.inhalData.length - 1].time);
          }
        });
    }
  } 

  @Input() set episode(episode: ThxEpisodeRespDataType) {
    
    this._episode = episode;
    if(this.episode){
      /// Clear previous content
      this.respData  = [];
      this.gasData   = [];
      this.inhalData = [];
      
      this.db.getRespData(episode.eid)
        .subscribe({
          next: (res: ThxRespDataType[]) => { this.respData.push(...res); },
          complete: () => {
            this.respData = [... this.respData];
            this.startTime = new Date(this.respData[0].time);
            this.endTime = new Date(this.respData[this.respData.length - 1].time);
            this.setDisplayTimes();
          }
        })
        
      this.db.getGasData(episode.eid)
        .subscribe({
          next: (res: ThxGasDataType[]) => { this.gasData.push(...res); },
          complete: () => { this.gasData = [... this.gasData]; }
        });
      
      this.db.getInhalData(episode.eid)
        .subscribe({
          next: (res: ThxInhalDataType[]) => { this.inhalData.push(...res); },
          complete: () => {
            this.inhalData = [...this.inhalData];
            this.startTime = new Date(this.inhalData[0].time);
            this.endTime   = new Date(this.inhalData[this.inhalData.length - 1].time);
          }
        });
    }
  }

  constructor(private db : DatabaseService) {
    this.startTime = this.fullMinutes(60);
    this.endTime = new Date(this.startTime.getTime() + 2 * 3600 * 1000);
    this.setDisplayTimes();
  }

  ngAfterViewInit(): void {}
  
  updateData() {
    
  }
  
  updateEpisodeTimes() {
    this.episode.begin = this.startTime.toISOString();
    this.episode.end = this.endTime.toISOString();
    this.db.updateEpisodeRecord(this.episode).subscribe(res => { 
      this.episodeUpdate = res;  /// 1: on success
    });
  }
}
