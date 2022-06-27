import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { APIResponse } from 'src/app/models/api-response';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementFormComponent } from '../individualstatements-form/individualstatement-form.component';

@Component({
  selector: 'app-individualstatements-summary',
  templateUrl: './individualstatements-summary.component.html',
  styleUrls: ['./individualstatements-summary.component.scss'],
})
export class IndividualStatementsSummaryComponent implements OnInit {

  @Output() filtersEvent = new EventEmitter<IndividualStatementFilters>();

  filters: IndividualStatementFilters = {
    full_name: '',
  };

  constructor(  ) { }

  ngOnInit() { }


}
