import { Component, Input, AfterViewInit }  from '@angular/core';
import { MatTableDataSource }               from '@angular/material/table';

import { DatabaseService }    from '../database.service';
import { ThxEpisodeDataType } from '../../model/thx.db.data.model';

@Component({
  selector: 'episode-frame',
  templateUrl: './episode-frame.component.html',
  styleUrls: ['./episode-frame.component.css']
})
export class EpisodeFrameComponent implements AfterViewInit {
  
  episodes: ThxEpisodeDataType[] = []; // =  new MatTableDataSource<ThxEpisodeDataType>();
  
  episodeColumns: string[] = ['id', 'device', 'value', 'begin', 'end' ];
  
  constructor(private db : DatabaseService) { }


  refresh() {
  }


  ngAfterViewInit(): void {
    this.db.getEpisodeData().subscribe({
      next:     (val: ThxEpisodeDataType[]) => { this.episodes.push(...val); },
      complete: () => {
        /// This 'refresh' is required for updating of displayed table
        this.episodes = [ ... this.episodes];
        console.log(`[episode-frame] Reading episodes finished.`); }
    });
  }

}
