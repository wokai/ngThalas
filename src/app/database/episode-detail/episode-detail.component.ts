import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';

import { ThxEpisodeCountDataType } from '../../model/thx.db.data.model';
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
  displayStartTime!: String;
  displayEndTime!: String;
  
  setDisplayTimes() {
    this.displayStartTime = `${this.startTime.toTimeString().substr(0, 8)}  (${this.startTime.toLocaleDateString()})`;
    this.displayEndTime = `${this.endTime.toTimeString().substr(0, 8)}  (${this.endTime.toLocaleDateString()})`;
  }


  private _episode!: ThxEpisodeCountDataType;
  
  @Input() set episode(episode: ThxEpisodeCountDataType) {
    this._episode = episode;
    if(this.episode){
      this.startTime = new Date(episode.begin);
      this.endTime = new Date(episode.end);
      this.setDisplayTimes();
    }
  }
  
  get episode(): ThxEpisodeCountDataType {
    return this._episode;
  }

  @Output() episodeChange = new EventEmitter<ThxEpisodeCountDataType>();

  constructor(private db : DatabaseService){
    this.startTime = new Date();
    this.endTime = new Date();
    this.setDisplayTimes();
  }

  ngAfterViewInit(): void {
    
  }

}
