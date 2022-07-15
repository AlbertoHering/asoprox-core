import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { APIResponse } from 'src/app/models/api-response';
import { Column } from 'src/app/models/data-table';
import { IndividualStatement, IndividualStatementFilters } from 'src/app/models/individualstatements';
import { IndividualStatementsService } from 'src/app/services/individualstatements/individualstatements.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {

  title: string = 'Estado de cuenta individual';

  constructor(
    private cookieService: CookieService,
    public individualStatementService: IndividualStatementsService, 
    public dialog: MatDialog,
    private toaster: ToasterService,
    private utils: UtilService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private currentUser = JSON.parse(this.cookieService.get('sessionData'))
  public member = {
    user: this.currentUser.full_name,
    id: this.currentUser.id
  };
  member_id: number = 0;
  summary: IndividualStatement[] = [];
  filteredUsers?: IndividualStatementFilters[];
  statement?: Array<IndividualStatement>;
  columns: Column[] = [
    {
      field: 'entry_date',
      title: 'Fecha de entrada',
      class: 'statement_entrydate'
    },
    {
      field: 'entry_amount_formatted',
      title: 'Aporte individual',
      class: 'statement_entryamount'
    },
    {
      field: 'company_match_amount_formatted',
      title: 'Aporte patronal',
      class: 'statement_companymatchamount'
    },
    {
      field: 'total_amount_formatted',
      title: 'Aporte total',
      class: 'statement_totalamount'
    },
  ];

  loadData() {
    this.applyFilters({
      member_id: this.member.id
    });
  }

  applyFilters(filters: IndividualStatementFilters) {
    if (typeof filters.member_id !== 'undefined') {
      this.member_id = filters.member_id;
      this.individualStatementService
      .getIndividualStatement(this.member_id, 0)
      .pipe(
        take(1),
        tap((getStatementResult) => {
          if (getStatementResult.success) {
            const result = getStatementResult.data;
            if (typeof result !== 'undefined') {
              result.map((r:IndividualStatement) => {
                r.entry_date = this.utils.formatDate(r.entry_date),
                r.entry_amount_formatted = this.utils.formatMoney( r.entry_amount ),
                r.company_match_amount_formatted = this.utils.formatMoney( r.company_match_amount ),
                r.total_amount_formatted = this.utils.formatMoney( +r.entry_amount + +r.company_match_amount )
              });
            }
            this.statement = result;

            this.individualStatementService
              .getIndividualStatement(this.member_id, 1)
              .pipe(
                take(1),
                tap((getIndividualSummaryResult) => {
                  if (getIndividualSummaryResult.success && typeof getIndividualSummaryResult?.data !== 'undefined') {
                    const result = getIndividualSummaryResult.data;
                    result.map((r:IndividualStatement) => {
                      r.entry_date = this.utils.formatDate(r.entry_date),
                      r.entry_amount_formatted = this.utils.formatMoney( r.entry_amount ),
                      r.company_match_amount_formatted = this.utils.formatMoney( r.company_match_amount ),
                      r.total_amount_formatted = this.utils.formatMoney( +r.entry_amount + +r.company_match_amount )
                    });
                    this.summary = result;
                }})).subscribe();
          }
        })
      )
      .subscribe();
    }
  }

}
