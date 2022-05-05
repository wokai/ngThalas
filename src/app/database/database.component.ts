import { Component, OnInit } from '@angular/core';


import { ThxEpisodeDataType } from '../model/thx.db.data.model';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  currentEpisode!: ThxEpisodeDataType;

  constructor() { }

  ngOnInit(): void {
  }

}
