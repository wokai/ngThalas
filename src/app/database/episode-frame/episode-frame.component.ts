import { Component, EventEmitter, Input, Output, AfterViewInit, ViewChild }  from '@angular/core';
import { MatPaginator       }               from '@angular/material/paginator';
import { MatTableDataSource }               from '@angular/material/table';

import { DatabaseService }    from '@service/database';

import { ThxDeviceData      } from '../../model/thx.core.model';
import { ThxEpisodeRespDataType } from '../../model/thx.db.data.model';

@Component({
  selector: 'episode-frame',
  templateUrl: './episode-frame.component.html',
  styleUrls: ['./episode-frame.component.css']
})
export class EpisodeFrameComponent implements AfterViewInit {
  
  devices: ThxDeviceData [] = [];
  episodes: ThxEpisodeRespDataType[] = [];
  episodeColumns: string[] = ['id', 'device', 'count', 'value', 'begin', 'end' ];
  device!: string;
  
  /// ////////////////////////////////////////////////////////////////////// ///
  /// Observable test area
  /// ////////////////////////////////////////////////////////////////////// ///
  epiResp: ThxEpisodeRespDataType[] = [];
  /// ////////////////////////////////////////////////////////////////////// ///
  
  @Input() episode!: ThxEpisodeRespDataType;
  @Output() episodeChange = new EventEmitter<ThxEpisodeRespDataType>();
    
  dataSource: MatTableDataSource<ThxEpisodeRespDataType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
  constructor(private db : DatabaseService) {
    this.dataSource = new MatTableDataSource<ThxEpisodeRespDataType>([]);
  }

  refresh() {}
  
  onHeaderRowClicked(): void {
    console.log('Header row clicked');
  }
  
  onRowClicked(row: ThxEpisodeRespDataType): void {
    this.episode = row;
    this.episodeChange.emit(row);
  }

  ngAfterViewInit(): void {
    this.db.getEpisodeRespData().subscribe({
      next:     (val: ThxEpisodeRespDataType[]) => { this.episodes.push(...val); },
      complete: () => {
        /// This 'refresh' is required for updating of displayed table
        this.episodes = [ ... this.episodes];
        this.dataSource = new MatTableDataSource<ThxEpisodeRespDataType>(this.episodes);
        this.dataSource.paginator = this.paginator;
    }});
    
    this.db.getDeviceData().subscribe({
      next:  (val: ThxDeviceData []) => { this.devices.push(...val); },
      complete: () => { this.devices = [ ... this.devices]; }
    });
    
    /// //////////////////////////////////////////////////////////////////// ///
    /// Observable test area
    /// //////////////////////////////////////////////////////////////////// ///
    this.db.getEpisodeRespObs().subscribe(val => {
      this.epiResp = [...val];
        console.log(`[EpisodeResp] Subscriber: Next. Length of val: ${val.length}`);
    });
    this.db.updateEpisodeRespData();
    /// //////////////////////////////////////////////////////////////////// ///
  }
  
  /// ////////////////////////////////////////////////////////////////////// ///
  /// Observable test area
  /// ////////////////////////////////////////////////////////////////////// ///
  updateEpisodeRespData(): void {
    this.db.updateEpisodeRespData();
  }
  /// ////////////////////////////////////////////////////////////////////// ///

}
