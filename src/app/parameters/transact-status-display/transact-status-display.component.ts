import { Component         } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list'; 

import { TransactResult    } from '../../model/medibus.param.model';
import { ParameterService  } from '../parameter.service';


@Component({
  selector: 'transact-status-display',
  templateUrl: './transact-status-display.component.html',
  styleUrls: ['./transact-status-display.component.css']
})
export class TransactStatusDisplayComponent {

  public status: TransactResult;

  constructor(public service: ParameterService) {
    this.status = service.transactResult;
  }

}
