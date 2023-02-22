import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef}      from '@angular/material/dialog';

import { MedibusParameterType, MedibusParameter }       from '../model/medibus.param.model';

@Component({
  selector: 'parameter-edit-dialog',
  templateUrl: './parameter-edit-dialog.component.html',
  styleUrls: ['./parameter-edit-dialog.component.css']
})
export class ParameterEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ParameterEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MedibusParameterType,
  ) {}
 
  onCancelClick(): void { this.dialogRef.close(); }
  onOkClick(): void { this.dialogRef.close(); }

}
