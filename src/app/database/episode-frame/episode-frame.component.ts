import { Component, EventEmitter, Input, Output, AfterViewInit, ViewChild }  from '@angular/core';
import { MatPaginator       }               from '@angular/material/paginator';
import { MatTableDataSource }               from '@angular/material/table';

import { DatabaseService }    from '../database.service';

import { ThxDeviceData      } from '../../model/thx.core.model';
import { ThxEpisodeCountDataType } from '../../model/thx.db.data.model';

@Component({
  selector: 'episode-frame',
  templateUrl: './episode-frame.component.html',
  styleUrls: ['./episode-frame.component.css']
})
export class EpisodeFrameComponent implements AfterViewInit {
  
  devices: ThxDeviceData [] = [];
  
  episodes: ThxEpisodeCountDataType[] = [];
  episodeColumns: string[] = ['id', 'device', 'count', 'value', 'begin', 'end' ];
  device!: string;
  
  @Input() episode!: ThxEpisodeCountDataType;
  @Output() episodeChange = new EventEmitter<ThxEpisodeCountDataType>();
    
  dataSource: MatTableDataSource<ThxEpisodeCountDataType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  constructor(private db : DatabaseService) {
    this.dataSource = new MatTableDataSource<ThxEpisodeCountDataType>([]);
  }

  refresh() {}
  
  onHeaderRowClicked(): void {
    console.log('Header row clicked');
  }
  
  onRowClicked(row: ThxEpisodeCountDataType): void {
    this.episode = row;
    this.episodeChange.emit(row);
  }

  ngAfterViewInit(): void {
    this.db.getEpisodeCountRespData().subscribe({
      next:     (val: ThxEpisodeCountDataType[]) => { this.episodes.push(...val); },
      complete: () => {
        /// This 'refresh' is required for updating of displayed table
        this.episodes = [ ... this.episodes];
        this.dataSource = new MatTableDataSource<ThxEpisodeCountDataType>(this.episodes);
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
