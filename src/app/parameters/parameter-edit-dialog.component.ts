'use strict';
/*******************************************************************************
 * The MIT License
 * Copyright 2023, Wolfgang Kaisers
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

import { Component, Inject }                          from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef}    from '@angular/material/dialog';
import { MatCheckboxModule }                          from '@angular/material/checkbox';

import { MedibusParameterType, MedibusParameter, 
                  EditDialogData, TransactResult }    from '../model/medibus.param.model';
import { ParameterService }                           from './parameter.service';

@Component({
  selector: 'parameter-edit-dialog',
  templateUrl: './parameter-edit-dialog.component.html',
  styleUrls: ['./parameter-edit-dialog.component.css']
})
export class ParameterEditDialogComponent {
     
  constructor(
    public dialogRef: MatDialogRef<ParameterEditDialogComponent>,
    private service: ParameterService,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData<MedibusParameter>
  ) {}
    
  onCancelClick(): void { this.dialogRef.close(); }
  onOkClick():     void {
    if(this.data.create){
      this.service.updateMedibusParameter(this.data.param).subscribe((data: TransactResult) => { this.dialogRef.close(); });
    } else {
      this.service.createMedibusParameter(this.data.param).subscribe((data: TransactResult) => { this.dialogRef.close(); });
    }
  }
  
}
