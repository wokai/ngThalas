import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bool',
  template: '<span [style.color]="getColor(val)">{{ getText(val) }}</span>',
  styleUrls: ['./bool.component.css']
})
export class BoolComponent implements OnInit {

  @Input() val!: boolean | null;

  constructor() { }

  ngOnInit(): void {}
  getText(val: boolean | null): string  {
    if(val === null) return '';
    return val ? 'True' : 'False';
  }
  getColor(val: boolean | null): string { return val ? '#28a745' : '#dc3545'; }
}
