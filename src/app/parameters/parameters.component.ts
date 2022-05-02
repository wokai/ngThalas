import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource }       from '@angular/material/table';
import { MatPaginator       }       from '@angular/material/paginator';

import { MedibusParameterType, MedibusParameter } from '../model/medibus.param.model';
import { ParameterService } from './parameter.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements AfterViewInit {
  
  parameters: MedibusParameter [] = [];
  dataSource: MatTableDataSource<MedibusParameterType>;
  
  paramColumns: string[] = [ 'id', 'code' , 'hexCode', 'description', 'unit', 'snomedid', 'format', 'm', 'll', 'hl' ];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ParameterService) {
    this.dataSource = new MatTableDataSource<MedibusParameterType>([]);
  }

  printRow(row: MedibusParameter) : void {
    console.log(`[param.comp] Click row: ${row.id}`)
  }


  ngAfterViewInit(): void {
    this.service.getMedibusParameters()
      .subscribe((data: MedibusParameter[]) => {
        this.parameters = this.parameters.concat(data);
        this.dataSource = new MatTableDataSource<MedibusParameterType>(this.parameters);
        this.dataSource.paginator = this.paginator;
      });
  }
}
