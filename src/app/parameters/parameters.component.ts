import { Component, AfterViewInit, ViewChild }  from '@angular/core';
import { MatTableDataSource }                           from '@angular/material/table';
import { MatPaginator       }                           from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef}      from '@angular/material/dialog';
import { MatButtonModule }                              from '@angular/material/button';

import { MedibusParameterType, MedibusParameter }   from '../model/medibus.param.model';
import { ParameterService }                         from './parameter.service';
import { ParameterEditDialogComponent }             from './parameter-edit-dialog.component';
import { TransactStatusDisplayComponent }           from './transact-status-display/transact-status-display.component';


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

  constructor(public dialog: MatDialog, private service: ParameterService) {
    this.dataSource = new MatTableDataSource<MedibusParameterType>([]);
  }
  
  openCreateDialog(): void {
    const param = new MedibusParameter();
    const dialogRef = this.dialog.open(ParameterEditDialogComponent, { data: { create: true, param: param }} );
  }
  
  openEditDialog(param: MedibusParameterType): void {
    const dialogRef = this.dialog.open(ParameterEditDialogComponent, { data: { create: false, param: param }} );
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
