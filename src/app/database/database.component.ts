import { Component, AfterViewInit } from '@angular/core';

import { ThxEpisodeRespDataType } from '../model/thx.db.data.model';
import { DatabaseService         } from './database.service';

@Component({
  selector: 'database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements AfterViewInit {

  currentEpisode!: ThxEpisodeRespDataType;

  constructor(private db : DatabaseService){}

  ngAfterViewInit(): void {}

}
