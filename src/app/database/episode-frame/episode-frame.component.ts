import { Component, Input, AfterViewInit, ViewChild }  from '@angular/core';
import { MatPaginator       }               from '@angular/material/paginator';
import { MatTableDataSource }               from '@angular/material/table';

import { DatabaseService }    from '../database.service';

import { ThxDeviceData      } from '../../model/thx.core.model';
import { ThxEpisodeDataType } from '../../model/thx.db.data.model';

@Component({
  selector: 'episode-frame',
  templateUrl: './episode-frame.component.html',
  styleUrls: ['./episode-frame.component.css']
})
export class EpisodeFrameComponent implements AfterViewInit {
  
  devices: ThxDeviceData [] = [];
  
  episodes: ThxEpisodeDataType[] = [];
  episodeColumns: string[] = ['id', 'device', 'value', 'begin', 'end' ];
  device!: string;
  
  dataSource: MatTableDataSource<ThxEpisodeDataType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  constructor(private db : DatabaseService) {
    this.dataSource = new MatTableDataSource<ThxEpisodeDataType>([]);
  }

  refresh() {}

  ngAfterViewInit(): void {
    this.db.getEpisodeData().subscribe({
      next:     (val: ThxEpisodeDataType[]) => { this.episodes.push(...val); },
      complete: () => {
        /// This 'refresh' is required for updating of displayed table
        this.episodes = [ ... this.episodes];
        this.dataSource = new MatTableDataSource<ThxEpisodeDataType>(this.episodes);
        this.dataSource.paginator = this.paginator;
    }});
    
    this.db.getDeviceData().subscribe({
      next:  (val: ThxDeviceData []) => { this.devices.push(...val); },
      complete: () => {
        this.devices = [ ... this.devices];
      }
    });
  }

}
