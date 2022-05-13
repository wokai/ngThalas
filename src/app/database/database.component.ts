import { Component, OnInit } from '@angular/core';


import { ThxEpisodeCountDataType } from '../model/thx.db.data.model';

@Component({
  selector: 'database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  currentEpisode!: ThxEpisodeCountDataType;

  constructor() { }

  ngOnInit(): void {
  }

}
