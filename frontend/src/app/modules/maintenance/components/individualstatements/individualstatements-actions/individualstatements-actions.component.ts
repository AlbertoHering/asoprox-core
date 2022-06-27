import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { APIResponse } from 'src/app/models/api-response';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from '../individualstatements-form/individualstatement-form.component';

@Component({
  selector: 'app-individualstatements-actions',
  templateUrl: './individualstatements-actions.component.html',
  styleUrls: ['./individualstatements-actions.component.scss'],
})
export class IndividualStatementsActionsComponent implements OnInit {

  @Output() filtersEvent = new EventEmitter<IndividualStatementFilters>();
  @Output() newIndividualStatementEvent = new EventEmitter<IndividualStatement>();

  filters: IndividualStatementFilters = {
    full_name: '',
  };

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() { }

  clearData() {
    this.filters.full_name = '';
    this.applyFilters();
  }

  openForm() {
    const dialogRef = this.dialog.open(IndividualStatementFormComponent);

    dialogRef
      .afterClosed()
      .subscribe((result: APIResponse<IndividualStatement>) =>
        this.newIndividualStatementEvent.emit(result.data)
      );
  }

  applyFilters() {
    this.filtersEvent.emit(this.filters);
  }
}
