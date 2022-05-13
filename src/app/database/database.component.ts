import { Component, OnInit } from '@angular/core';


import { ThxEpisodeRespDataType } from '../model/thx.db.data.model';

@Component({
  selector: 'database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  currentEpisode!: ThxEpisodeRespDataType;

  constructor() { }

  ngOnInit(): void {
  }

}
