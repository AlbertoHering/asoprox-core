import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, startWith, take, tap } from 'rxjs/operators';

import { IndividualStatement } from 'src/app/models/individualstatements';
import { User } from 'src/app/models/user';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';

@Component({
  selector: 'app-individualstatement-form',
  templateUrl: './individualstatement-form.component.html',
  styleUrls: ['./individualstatement-form.component.scss'],
})
export class IndividualStatementFormComponent implements OnInit {
  individualstatementData: IndividualStatement;
  individualstatementForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<IndividualStatementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndividualStatement,
    public individualstatementsService: IndividualStatementsService,
    public toasterService: ToasterService
  ) {
    this.individualstatementData = data;
  }

  ngOnInit() {
    this.individualstatementForm = new FormGroup({
      id: new FormControl(this.individualstatementData?.member_id || '', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2)
      ]),
      name: new FormControl(this.individualstatementData?.full_name || '', [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });

    this.loadData();
  }

  loadData() {
    this.individualstatementData;
  }

  displayFn(data: IndividualStatement): string {
    return data?.full_name || '';
  }

  onSubmit() {

    if (!this.individualstatementData) {
      this.individualstatementsService
        .addIndividualStatement(this.individualstatementForm.value)
        .pipe(
          take(1),
          tap((individualstatementResult) => {
            this.toasterService.openSnackBar(
              individualstatementResult.success ? 'success' : 'danger',
              'Create IndividualStatement',
              individualstatementResult.message
            );
            if (individualstatementResult.success) {
              this.dialogRef.close(individualstatementResult);
            }
          })
        )
        .subscribe();
    } else {
      this.individualstatementsService
        .updateIndividualStatement(this.individualstatementForm.value, this.individualstatementData.member_id)
        .pipe(
          take(1),
          tap((individualstatementResult) => {
            this.toasterService.openSnackBar(
              individualstatementResult.success ? 'success' : 'danger',
              'Update IndividualStatement',
              individualstatementResult.message
            );
            if (individualstatementResult.success) {
              this.dialogRef.close();
            }
          })
        )
        .subscribe();
    }
  }
}
