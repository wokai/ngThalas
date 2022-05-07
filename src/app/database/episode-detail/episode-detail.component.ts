import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';

import { ThxEpisodeCountDataType } from '../../model/thx.db.data.model';

@Component({
  selector: 'episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements AfterViewInit {


  @Input() episode!: ThxEpisodeCountDataType;
  @Output() episodeChange = new EventEmitter<ThxEpisodeCountDataType>();

  id: number = 1;

  constructor() { }

  ngAfterViewInit(): void {
    
  }

}
