import { Component, Input, AfterViewInit } from '@angular/core';

import { DatabaseService }                      from '../database.service';

@Component({
  selector: 'episode-frame',
  templateUrl: './episode-frame.component.html',
  styleUrls: ['./episode-frame.component.css']
})
export class EpisodeFrameComponent implements AfterViewInit {

  constructor(private db : DatabaseService) { }

  ngAfterViewInit(): void {
  }

}
