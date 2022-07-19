import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, startWith, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { User } from 'src/app/models/user';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-individualstatement-form',
  templateUrl: './individualstatement-form.component.html',
  styleUrls: ['./individualstatement-form.component.scss'],
})
export class IndividualStatementFormComponent implements OnInit {
  individualstatementData: IndividualStatement;
  individualstatementForm!: FormGroup;
  dateRange: IndividualStatementFilters[] = [];
  filteredDateRange?: Observable<IndividualStatementFilters[]>;
  dateRangeControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<IndividualStatementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndividualStatement,
    public individualstatementsService: IndividualStatementsService,
    public toasterService: ToasterService,
    public utils: UtilService
  ) {
    this.individualstatementData = data;
  }

  ngOnInit() {
    this.individualstatementForm = new FormGroup({
      id: new FormControl(this.individualstatementData?.statement_id || ''),
      member_id: new FormControl(this.individualstatementData?.member_id || ''),
      entry_amount: new FormControl(this.individualstatementData?.entry_amount || '', [
        Validators.required
      ]),
      company_match_amount: new FormControl(this.individualstatementData?.company_match_amount || '', [
        Validators.required
      ]),
      entry_date: new FormControl(
        typeof this.individualstatementData?.entry_date !== 'undefined' ? this.utils.formatDate(this.individualstatementData.entry_date) : '', [
        Validators.required
      ]),
    });

    this.loadData();
  }

  loadData() {
    this.individualstatementsService
    .getDateRange()
    .pipe(
      take(1),
      tap((getDateRangeResults) => {
        if (getDateRangeResults.success && getDateRangeResults.data) {
          const result = getDateRangeResults.data;
          result.map((r:IndividualStatementFilters) => {
            r.entry_date = this.utils.formatDate(r.entry_date!)
          });
          this.dateRange = result;
          const dateRange = result.find((o:IndividualStatementFilters) => 
            o.entry_date === this.individualstatementData?.entry_date
          );
          if (typeof dateRange !== 'undefined') {
            this.dateRangeControl.setValue(dateRange.entry_date);
          }
          this.filteredDateRange = this.dateRangeControl.valueChanges.pipe(
            startWith(''),
            map((value: { name: any; }) => (typeof value === 'string' ? value : value.name)),
            map((name: string) =>
              name ? this._filterDateRange(name) : this.dateRange.slice()
            )
          );
      }})).subscribe();

  }

  displayFn(data: IndividualStatement): string {
    return data?.full_name || '';
  }

  displayDateRange(data: IndividualStatementFilters): string {
    return data.toString();
  }

  private _filterDateRange(name: string): IndividualStatementFilters[] {
    const filterValue = !!name && name.toString() || name;
    return this.dateRange.filter((option) => {
      return option.entry_date! === filterValue ? true : false
    });
  }

  onChangeEvent() {
    this.dateRangeControl.setValue(this.dateRangeControl.value);
    this.individualstatementForm.controls['entry_date'].setValue(this.dateRangeControl.value);
  }

  onSubmit() {

    const member = document.getElementById('member_id') as HTMLDivElement;
    const member_id = member.getAttribute('data-value');

    if (null===member_id) {
      /** Nothing to do */
    } else {

      this.individualstatementForm.controls['member_id'].setValue(member_id);

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
}
