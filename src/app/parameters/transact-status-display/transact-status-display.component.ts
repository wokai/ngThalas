import { Component }          from '@angular/core';
import { ParameterService }   from '../parameter.service';

@Component({
  selector: 'app-transact-status-display',
  templateUrl: './transact-status-display.component.html',
  styleUrls: ['./transact-status-display.component.css']
})
export class TransactStatusDisplayComponent {

  constructor(private service: ParameterService) {
    
  }

}
