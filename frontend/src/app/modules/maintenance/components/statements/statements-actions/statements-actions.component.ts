import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { APIResponse } from 'src/app/models/api-response';
import { Statement, StatementFilters } from 'src/app/models/statement';
import { StatementFormComponent } from '../statements-form/statement-form.component';

@Component({
  selector: 'app-statements-actions',
  templateUrl: './statements-actions.component.html',
  styleUrls: ['./statements-actions.component.scss'],
})
export class StatementsActionsComponent implements OnInit {

  @Output() filtersEvent = new EventEmitter<StatementFilters>();
  @Output() newStatementEvent = new EventEmitter<Statement>();

  filters: StatementFilters = {
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

  applyFilters() {
    this.filtersEvent.emit(this.filters);
  }
}
