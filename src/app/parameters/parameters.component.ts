import { Component, AfterViewInit } from '@angular/core';

import { MedibusParameterType, MedibusParameter } from '../model/medibus.param.model';
import { ParameterService } from './parameter.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements AfterViewInit {

  parameters: MedibusParameter [] = [];

  constructor(private service: ParameterService) { }

  ngAfterViewInit(): void {
      this.service.getMedibusParameters()
      .subscribe((data: MedibusParameter[]) => {
        this.parameters = this.parameters.concat(data);
      });
  }

}
