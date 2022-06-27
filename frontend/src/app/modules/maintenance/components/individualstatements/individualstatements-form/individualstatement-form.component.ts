import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';

import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { IndividualStatement } from 'src/app/models/individualstatements';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';

@Component({
  selector: 'app-individualstatement-form',
  templateUrl: './individualstatement-form.component.html',
  styleUrls: ['./individualstatement-form.component.scss'],
})
export class IndividualStatementFormComponent implements OnInit {
  individualstatementData: IndividualStatement;
  readOnly: Boolean = false;
  individualstatementEdit: Boolean = false
  individualstatementForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<IndividualStatementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndividualStatement,
    public individualstatementsService: IndividualStatementsService,
    public toasterService: ToasterService
  ) {
    this.individualstatementData = data;
    this.readOnly = data?.read_only || false;
  }

  ngOnInit() {
    this.individualstatementForm = new FormGroup({
      member_id: new FormControl(this.individualstatementData?.member_id || ''),
      entry_amount: new FormControl({
          value: this.individualstatementData?.entry_amount || '',
          disabled: this.individualstatementEdit
        }),
      entry_date: new FormControl(this.individualstatementData?.entry_date || ''),
    });

    this.loadData();
  }

  loadData() {

    if (this.readOnly) {
        this.individualstatementForm.disable();
      }

  }

  onSubmit() {

    if (!this.individualstatementData) {
      this.individualstatementsService
        .addIndividualStatement(this.individualstatementForm.value)
        .pipe(
          take(1),
          tap((result: { success: boolean; message: string; }) => {
            this.toasterService.openSnackBar(
              result.success ? 'success' : 'danger',
              'Crear Miembro Asociado',
              result.message
            );
            if (result.success) {
              this.dialogRef.close(result);
            }
          })
        )
        .subscribe();
    } else {
      this.individualstatementsService
        .updateIndividualStatement(this.individualstatementForm.value, this.individualstatementData.statement_id)
        .pipe(
          take(1),
          tap((result: { success: boolean; message: string; }) => {
            this.toasterService.openSnackBar(
              result.success ? 'success' : 'danger',
              'Actualizar Miembro Asociado',
              result.message
            );
            if (result.success) {
              this.dialogRef.close(result);
              if (this.individualstatementEdit) {
                
              }
            }
          })
        )
        .subscribe();
    }
  }
}
