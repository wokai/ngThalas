import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';

import { ThxEpisodeRespDataType } from '../../model/thx.db.data.model';
import { DatabaseService         } from '../database.service';

@Component({
  selector: 'episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements AfterViewInit {

  startTime: Date;
  endTime: Date;

  /// Transform incoming dates into readable format
  episodeStartTime!: String;
  episodeEndTime!: String;
  
  setDisplayTimes() {
    this.episodeStartTime = `${this.startTime.toTimeString().substr(0, 8)}  (${this.startTime.toLocaleDateString()})`;
    this.episodeEndTime = `${this.endTime.toTimeString().substr(0, 8)}  (${this.endTime.toLocaleDateString()})`;
  }


  private _episode!: ThxEpisodeRespDataType;
  
  @Input() set episode(episode: ThxEpisodeRespDataType) {
    this._episode = episode;
    if(this.episode){
      this.startTime = new Date(episode.ebegin);
      this.endTime = new Date(episode.eend);
      this.setDisplayTimes();
    }
  }
  
  get episode(): ThxEpisodeRespDataType {
    return this._episode;
  }

  @Output() episodeChange = new EventEmitter<ThxEpisodeRespDataType>();

  constructor(private db : DatabaseService){
    this.startTime = new Date();
    this.endTime = new Date();
    this.setDisplayTimes();
  }

  ngAfterViewInit(): void {
    
  }

}
