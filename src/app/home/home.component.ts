import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  colors = [ 'lightblue', 'lightgreen', 'lightpink', '#DDBDF1' ];

  constructor() { }

  ngOnInit(): void {
  }

}
